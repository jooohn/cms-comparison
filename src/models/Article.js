export class Article {

  constructor({ id, title, body, tags, relatedArticles }) {
    Object.assign(this, { id, title, body, tags, relatedArticles });
  }

}