import { Publicacao } from './Publicacao.js';
import { PublicacaoRepository } from '../persistencia/PublicacaoRepository.js';

export class PublicacaoService {
  #repositorio;

  constructor(repositorio = new PublicacaoRepository()) {
    this.#repositorio = repositorio;
  }

  criarPublicacao(autor, titulo, corpo, fonte = null) {
    const autorLimpo = typeof autor === 'string' ? autor.trim() : '';
    const tituloLimpo = typeof titulo === 'string' ? titulo.trim() : '';
    const corpoLimpo = typeof corpo === 'string' ? corpo.trim() : '';
    const fonteLimpa = typeof fonte === 'string' && fonte.trim() ? fonte.trim() : null;

    if (!autorLimpo) {
      throw new Error('O campo "autor" é obrigatório.');
    }
    if (!tituloLimpo) {
      throw new Error('O campo "titulo" é obrigatório.');
    }
    if (!corpoLimpo) {
      throw new Error('O campo "corpo" é obrigatório.');
    }

    const publicacao = new Publicacao({
      autor: autorLimpo,
      titulo: tituloLimpo,
      corpo: corpoLimpo,
      fonte: fonteLimpa,
    });

    return this.#repositorio.salvar(publicacao);
  }

  listarPublicacoes() {
    return this.#repositorio.listarTodas();
  }

  buscarPorId(id) {
    return this.#repositorio.buscarPorId(id);
  }
}