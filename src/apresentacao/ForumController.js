import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PublicacaoService } from '../negocio/PublicacaoService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAMINHO_INDEX_HTML = path.join(__dirname, 'public', 'index.html');

export class ForumController {
  #publicacaoService;

  constructor(publicacaoService = new PublicacaoService()) {
    this.#publicacaoService = publicacaoService;
  }

  async publicar(req, res) {
    try {
      const dados = await this.#lerCorpoJson(req);
      const publicacao = this.#publicacaoService.criarPublicacao(
        dados.autor,
        dados.titulo,
        dados.corpo,
        dados.fonte
      );

      this.#enviarJson(res, 201, publicacao);
    } catch (erro) {
      this.#enviarJson(res, 400, { erro: erro.message });
    }
  }

  listarPublicacoes(req, res) {
    const publicacoes = this.#publicacaoService.listarPublicacoes();
    this.#enviarJson(res, 200, publicacoes);
  }

  #servirInterface(res) {
    const html = fs.readFileSync(CAMINHO_INDEX_HTML, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }

  #lerCorpoJson(req) {
    return new Promise((resolve, reject) => {
      let corpo = '';

      req.on('data', (chunk) => {
        corpo += chunk;
      });

      req.on('end', () => {
        if (!corpo.trim()) {
          resolve({});
          return;
        }
        try {
          resolve(JSON.parse(corpo));
        } catch {
          reject(new Error('JSON inválido no corpo da requisição.'));
        }
      });

      req.on('error', () => reject(new Error('Erro ao ler a requisição.')));
    });
  }

  #enviarJson(res, status, dados) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(dados));
  }

  iniciarServidor(porta = Number(process.env.PORT) || 3001) {
    const servidor = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);

      if (req.method === 'GET' && url.pathname === '/') {
        this.#servirInterface(res);
        return;
      }

      if (req.method === 'GET' && url.pathname === '/api/publicacoes') {
        this.listarPublicacoes(req, res);
        return;
      }

      if (req.method === 'POST' && url.pathname === '/api/publicacoes') {
        this.publicar(req, res);
        return;
      }

      this.#enviarJson(res, 404, { erro: 'Rota não encontrada.' });
    });

    servidor.listen(porta, () => {
      console.log(`G2_ProjetoForum rodando em http://localhost:${porta}`);
    });

    return servidor;
  }
}

if (process.argv[1] === __filename) {
  const controller = new ForumController();
  controller.iniciarServidor();
}