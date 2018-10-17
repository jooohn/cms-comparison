import React from 'react';
import {
  Button,
  Card, Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListSubheader,
  Typography,
  withStyles
} from '@material-ui/core';
class CmsDemo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      listDescription: '',
      detail: null,
    };
  }

  showFeaturedArticles = async e => {
    const articles = await this.props.cms.fetchFeaturedArticles();
    this.setState({
      list: articles,
      listDescription: 'Featured Articles'
    });
  };

  showDetail = article => async e => {
    const detail = await this.props.cms.fetchArticle(article);
    this.setState({ detail });
  };

  searchByTag = tag => async e => {
    const articles = await this.props.cms.searchByTag(tag);
    this.setState({
      list: articles,
      listDescription: `Search by tag: ${tag}`,
    });
  };

  render = () => {
    const { classes } = this.props;
    const { list, listDescription, detail } = this.state;
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Button onClick={this.showFeaturedArticles} variant="contained" color="primary" >
            Fetch Featured Articles
          </Button>
          <Divider />
          <List subheader={
            <ListSubheader component="div">{listDescription}</ListSubheader>
          }>
            {list.map((article) => (
              <ListItem key={article.id} button onClick={this.showDetail(article)} >
                {article.title}
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div className={classes.content}>
          {detail && (
            <React.Fragment>
              <Typography variant="h2">
                {detail.title}
              </Typography>
              <div dangerouslySetInnerHTML={{__html: detail.body}}></div>
              <Typography variant="h5">
                Tags
              </Typography>
              {detail.tags.map((tag, index) => (
                <Chip key={index} label={tag} onClick={this.searchByTag(tag)}/>
              ))}
              <Typography variant="h5">
                Related Articles
              </Typography>
              <List>
                {detail.relatedArticles.map(article => (
                  <ListItem key={article.id} button onClick={this.showDetail(article)}>
                    {article.title}
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  };

}
export default withStyles(theme => ({
  root: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}))(CmsDemo);