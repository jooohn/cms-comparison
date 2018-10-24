import React from 'react';

class Static extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      contentId: null,
      html: '',
    };
  }

  componentDidMount() {
    this._loadContent();
  }
  componentDidUpdate() {
    this._loadContent();
  }
  _loadContent() {
    const { cms, contentId } = this.props;
    if(contentId !== this.state.contentId) {
      cms.fetchStaticContentByIdentity(contentId)
        .then(
          (html) => this.setState({ html }),
          (e) => this.setState({ html: `<p>There is no content like ${contentId}` })
        );
      this.setState({ contentId });
    }
  }

  render = () => {
    return (
      <div dangerouslySetInnerHTML={{__html: this.state.html}}/>
    )
  }

}
export default Static;
