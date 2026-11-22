import fs from 'node:fs';
import path from 'node:path';
import { Publicacao } from '../negocio/Publicacao.js';

export class PublicacaoRepository {
  #caminhoArquivo;
  #publicacoes;
  #proximoId;

  constructor(caminhoArquivo = path.resolve(process.cwd(), 'data', 'publicacoes.json')) {
    this.#caminhoArquivo = caminhoArquivo;
    this.#publicacoes = new Map();
    this.#proximoId = 1;
    this.#carregar();
  }

  salvar(publicacao) {
    if (!publicacao.id) {
      publicacao.id = `p${this.#proximoId++}`;
    }

    this.#publicacoes.set(publicacao.id, publicacao);
    this.#sincronizar();
    return publicacao;
  }

  listarTodas() {
    return Array.from(this.#publicacoes.values());
  }

  buscarPorId(id) {
    return this.#publicacoes.get(id) ?? null;
  }

  #carregar() {
    if (!fs.existsSync(this.#caminhoArquivo)) {
      return;
    }

    const conteudo = fs.readFileSync(this.#caminhoArquivo, 'utf-8').trim();
    if (!conteudo) {
      return;
    }

    const registros = JSON.parse(conteudo);
    let maiorNumero = 0;

    for (const item of registros) {
      const publicacao = new Publicacao(item);
      this.#publicacoes.set(publicacao.id, publicacao);

      const numero = Number.parseInt(String(publicacao.id).replace(/^p/, ''), 10);
      if (!Number.isNaN(numero) && numero > maiorNumero) {
        maiorNumero = numero;
      }
    }

    this.#proximoId = maiorNumero + 1;
  }

  #sincronizar() {
    const diretorio = path.dirname(this.#caminhoArquivo);
    fs.mkdirSync(diretorio, { recursive: true });

    const dados = JSON.stringify(this.listarTodas(), null, 2);
    fs.writeFileSync(this.#caminhoArquivo, dados, 'utf-8');
  }
}