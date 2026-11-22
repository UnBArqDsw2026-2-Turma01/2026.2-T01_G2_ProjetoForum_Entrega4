export class Publicacao {
  constructor({ id = null, autor, titulo, corpo, fonte = null, dataCriacao = new Date() }) {
    this.id = id;
    this.autor = autor;
    this.titulo = titulo;
    this.corpo = corpo;
    this.fonte = fonte;
    this.dataCriacao = dataCriacao instanceof Date ? dataCriacao : new Date(dataCriacao);
  }
}