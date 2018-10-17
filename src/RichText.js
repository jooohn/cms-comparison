import React from 'react';
import { INLINES, MARKS, BLOCKS } from '@contentful/rich-text-types';
import { Card, CardContent } from "@material-ui/core";

const MARKS_MAP = {
  [MARKS.BOLD]: component => <b>{component}</b>,
  [MARKS.ITALIC]: component => <i>{component}</i>,
  [MARKS.UNDERLINE]: component => <u>{component}</u>,
  [MARKS.CODE]: component => <code>{component}</code>,
};

const BlockEmbeddedEntry = ({ target }) => {
  switch (target.sys.contentType.sys.id) {
    case 'image':
      return target.fields.floatRight
        ? (
          <figure style={{float: 'right'}}>
            <img style={{
              width: '240px',
            }} src={target.fields.src.fields.file.url} />
            <figcaption>{target.fields.caption}</figcaption>
          </figure>
        )
        : (
          <div>
            <img style={{width: '100%'}} src={target.fields.src.fields.file.url} />
          </div>
        );
    default:
      return `!!!EMBEDDED TYPE FOR ${target.sys.contentType.sys.id} is not implemented`;
  }
};

const InlineEmbeddedEntry = ({ target }) => {
  switch (target.sys.contentType.sys.id) {
    default:
      return `!!!EMBEDDED TYPE FOR ${target.sys.contentType.sys.id} is not implemented`;
  }
};

const Components = ({ content }) => (
  <React.Fragment>
    {content.map((props, index) => <Component key={index} {...props} />)}
  </React.Fragment>
);

const COMPONENTS = {
  [BLOCKS.HEADING_1]: ({ content }) => <h1><Components content={content}/></h1>,
  [BLOCKS.HEADING_2]: ({ content }) => <h2><Components content={content}/></h2>,
  [BLOCKS.HEADING_3]: ({ content }) => <h3><Components content={content}/></h3>,
  [BLOCKS.HEADING_4]: ({ content }) => <h4><Components content={content}/></h4>,
  [BLOCKS.HEADING_5]: ({ content }) => <h5><Components content={content}/></h5>,
  [BLOCKS.HEADING_6]: ({ content }) => <h6><Components content={content}/></h6>,
  [BLOCKS.PARAGRAPH]: ({ content }) => <p><Components content={content}/></p>,
  [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target } }) => <BlockEmbeddedEntry target={target}/>,
  [BLOCKS.UL_LIST]: ({ content }) => (
    <ul>
      {content.map((li, index) => (
        <li key={index}><Components content={li.content}/></li>
      ))}
    </ul>
  ),
  [BLOCKS.QUOTE]: ({ content }) => (
    <Card>
      <CardContent>
        <Components content={content}/>
      </CardContent>
    </Card>
  ),
  'text': ({ value }) => value || '',
  [INLINES.ASSET_HYPERLINK]: ({ data, content }) => (
    <a href={data.target.fields.file.url} target="_blank">
      <Components content={content} />
    </a>
  ),
  [INLINES.EMBEDDED_ENTRY]: ({ data: { target } }) =>
    <InlineEmbeddedEntry target={target}/>,
  [INLINES.HYPERLINK]: ({ data: { uri }, content }) =>
    <a href={uri} target="_blank"><Components content={content}/></a>,
};

const Component = (props) => {
  const toBlock = COMPONENTS[props.nodeType];
  if (!toBlock) {
    console.log(props);
  }

  const base = toBlock
    ? toBlock(props)
    : <span>Component for {props.nodeType} is not implemented.</span>;
  return (props.marks || []).reduce((acc, { type }) => MARKS_MAP[type](acc), base);
};

export default ({ document }) => document && (
  // return <div dangerouslySetInnerHTML={{__html: documentToHtmlString(document)}}/>;
  <Components content={document.content} />
);
