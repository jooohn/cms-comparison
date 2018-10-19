import React from 'react';
import PropTypes from 'prop-types'
import {
  Chip,
  List,
  ListItem,
  Typography,
  withStyles
} from '@material-ui/core';
import { Article } from "./models/Article";
import RichText from "./RichText";

class ArticleRenderer extends React.Component {
  static propTypes = {
    article: PropTypes.instanceOf(Article),
    /** f(tag: string) */
    onTagSelected: PropTypes.func,
    /** f(article: Article) */
    onArticleSelected: PropTypes.func,
  }

  render() {
    const { article, onTagSelected, onArticleSelected } = this.props;
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