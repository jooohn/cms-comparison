import { createClient } from 'contentful';
import { Article } from "./models/Article";

export class Contentful {

  constructor({ space, host, accessToken }) {
    this.client = createClient({ space, host, accessToken });

    (async () => {
      console.log(await this.client.getEntries({content_type: 'testMarkdown'}));
    })();
  }

  static newArticle = (baseArticle) => {
    const go = level => article => {
      const id = article.sys.id;
      return (article.fields && level > 0)
        ? new Article({
          id,
          title: article.fields.title,
          body: article.fields.body,
          tags: article.fields.tags,
          relatedArticles: (article.fields.relatedArticles || []).map(go(level - 1)),
        })
        : new Article({ id });
    };
    return go(2)(baseArticle);
  };

  name = 'Contentful';

  fetchFeaturedArticles = async () => {
    const response = await this.client.getEntries({
      content_type: 'featuredArticles',
      limit: 1,
      include: 2,
    });
    const item = response.items[0];
    const articles = item
      ? item.fields.articles.map(Contentful.newArticle)
      : [];
    console.log(articles);
    return articles;
  };

  fetchArticle = async (item) => {
    // NOTE: We have to call getEntries API to include associations.
    const response = await this.client.getEntries({
      'sys.id': item.id || item,
      limit: 1,
      include: 2,
    });
    const detail = response.items[0];
    if (detail) {
      const article = Contentful.newArticle(detail);
      console.log({ detail, article });
      return article;
    }
  };

  searchByTag = async (tag) => {
    const response = await this.client.getEntries({
      content_type: 'article',
      'fields.tags[in]': tag,
      limit: 20,
    });
    return response.items.map(Contentful.newArticle);
  };

}
