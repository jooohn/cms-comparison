import React from 'react';
import { withRouter, Route } from "react-router";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListSubheader,
  withStyles
} from '@material-ui/core';
import ArticleRenderer from "./ArticleRenderer";

// eslint-disable-next-line
const sample = JSON.parse(`
{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Hello, Great News!","nodeType":"text"}],"nodeType":"heading-1"},{"data":{"target":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"s0bw7ztmk1wa"}},"id":"2cGAPMv25mSK6gmS2uqUOm","type":"Entry","createdAt":"2018-10-17T18:10:13.375Z","updatedAt":"2018-10-17T18:10:13.375Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"image"}},"locale":"en-US"},"fields":{"src":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"s0bw7ztmk1wa"}},"id":"3p1NgZfUsgsAeKY4cyeUgw","type":"Asset","createdAt":"2018-10-17T18:09:55.057Z","updatedAt":"2018-10-17T18:09:55.057Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"locale":"en-US"},"fields":{"title":"photo-1539658271376-c1e01aa9bab6","description":"","file":{"url":"//images.ctfassets.net/s0bw7ztmk1wa/3p1NgZfUsgsAeKY4cyeUgw/378c1d79e66083eb90a908b0852e79f2/photo-1539658271376-c1e01aa9bab6","details":{"size":168338,"image":{"width":800,"height":1000}},"fileName":"photo-1539658271376-c1e01aa9bab6","contentType":"image/jpeg"}}},"caption":"foo"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"Lorem ipsum dolor sit amet, ","nodeType":"text"},{"data":{},"marks":[{"type":"bold"}],"value":"consectetur","nodeType":"text"},{"data":{},"marks":[],"value":" adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Apple","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"list-item"},{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Banana","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"list-item"},{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Orange","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"list-item"}],"nodeType":"unordered-list"},{"data":{},"content":[{"data":{},"marks":[],"value":"Rich Text","nodeType":"text"}],"nodeType":"heading-3"},{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Everything is practice.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"blockquote"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"},{"data":{"target":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"s0bw7ztmk1wa"}},"id":"1MPr62iewEy4EWGwQuescK","type":"Asset","createdAt":"2018-10-17T16:41:02.527Z","updatedAt":"2018-10-17T16:41:02.527Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"locale":"en-US"},"fields":{"title":"j-tomioka","file":{"url":"//images.ctfassets.net/s0bw7ztmk1wa/1MPr62iewEy4EWGwQuescK/50c8fa24be1eafd1d50e60978dd0562c/j-tomioka.jpg","details":{"size":21222,"image":{"width":400,"height":400}},"fileName":"j-tomioka.jpg","contentType":"image/jpeg"}}}},"content":[{"data":{},"marks":[],"value":"j-tomioka","nodeType":"text"}],"nodeType":"asset-hyperlink"},{"data":{},"marks":[],"value":" is a man. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Ultrices vitae auctor eu augue ut lectus arcu. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Cras semper auctor neque vitae tempus. Facilisi cras fermentum odio eu feugiat pretium nibh. Libero justo laoreet sit amet cursus. Congue nisi vitae suscipit tellus mauris. Viverra ipsum nunc aliquet bibendum enim facilisis. Nulla facilisi morbi tempus iaculis urna id volutpat. Convallis posuere morbi leo urna molestie at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Ultricies integer quis auctor elit sed vulputate mi sit amet. Ipsum a arcu cursus vitae. Nec ultrices dui sapien eget. Nulla facilisi etiam dignissim diam quis. Eleifend donec pretium vulputate sapien nec. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Sit amet dictum sit amet justo donec.","nodeType":"text"},{"data":{"target":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"s0bw7ztmk1wa"}},"id":"2cGAPMv25mSK6gmS2uqUOm","type":"Entry","createdAt":"2018-10-17T18:10:13.375Z","updatedAt":"2018-10-17T18:10:13.375Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"image"}},"locale":"en-US"},"fields":{"src":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"s0bw7ztmk1wa"}},"id":"3p1NgZfUsgsAeKY4cyeUgw","type":"Asset","createdAt":"2018-10-17T18:09:55.057Z","updatedAt":"2018-10-17T18:09:55.057Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"locale":"en-US"},"fields":{"title":"photo-1539658271376-c1e01aa9bab6","description":"","file":{"url":"//images.ctfassets.net/s0bw7ztmk1wa/3p1NgZfUsgsAeKY4cyeUgw/378c1d79e66083eb90a908b0852e79f2/photo-1539658271376-c1e01aa9bab6","details":{"size":168338,"image":{"width":800,"height":1000}},"fileName":"photo-1539658271376-c1e01aa9bab6","contentType":"image/jpeg"}}},"caption":"foo"}}},"content":[],"nodeType":"embedded-entry-inline"},{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}
`);

class CmsDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      listDescription: '',
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
    const { history } = this.props;
    const newPath = `/article/${article.id}`;
    if(history.location.pathname !== newPath) {
      history.push(`/article/${article.id}`);
    }
  };

  searchByTag = tag => async e => {
    const articles = await this.props.cms.searchByTag(tag);
    this.setState({
      list: articles,
      listDescription: `Search by tag: ${tag}`,
    });
  };

  render = () => {
    const { cms, classes } = this.props;
    const { list, listDescription } = this.state;
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
        <Route path="/article/:articleId" render={({match}) => 
          <div className={classes.content}>
            {<ArticleRenderer 
              cms={cms}
              articleId={match.params.articleId}
              onTagSelected={this.searchByTag} 
              onArticleSelected={this.showDetail}
            />}
          </div>
        } />
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
    overflowY: 'scroll',
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}))(withRouter(CmsDemo));