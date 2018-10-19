import React from 'react';
import PropTypes from 'prop-types'
import {
  Chip,
  List,
  ListItem,
  Typography,
  withStyles
} from '@material-ui/core';
import { Contentful } from "./cms";
import RichText from "./RichText";

class ArticleRenderer extends React.Component {
  static propTypes = {
    cms: PropTypes.instanceOf(Contentful),

    articleId: PropTypes.string,

    /** f(tag: string) */
    onTagSelected: PropTypes.func,
    /** f(article: Article) */
    onArticleSelected: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { 
      article: null,
    };
  }

  componentDidMount() {
    this._loadArticle();    
  }
  componentDidUpdate() {
    this._loadArticle();
  }
  _loadArticle() {
    const { cms, articleId } = this.props;
    if(!(this.state.article && this.state.article.id === articleId)) {
      cms.fetchArticle(articleId).then((article) => {
        this.setState({ article });
      });
    }
  }

  render() {
    const { onTagSelected, onArticleSelected } = this.props;
    const { article } = this.state;

    if (! article) return <React.Fragment />;
    return (
      <React.Fragment>
        <Typography variant="h2">
          {article.title}
        </Typography>
        <RichText document={article.body} />
        <div style={{ clear: 'both' }} />
        <Typography variant="h5">
          Tags
              </Typography>
        {article.tags.map((tag, index) => (
          <Chip key={index} label={tag} onClick={onTagSelected(tag)} />
        ))}
        <Typography variant="h5">
          Related Articles
              </Typography>
        <List>
          {article.relatedArticles.map(article => (
            <ListItem key={article.id} button onClick={onArticleSelected(article)}>
              {article.title}
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(theme => ({
  // May be we set some classes/styles here.
}))(ArticleRenderer);