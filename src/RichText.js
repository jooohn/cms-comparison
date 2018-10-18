import React from 'react';
import { INLINES, MARKS, BLOCKS } from '@contentful/rich-text-types';
import { Card, CardContent } from "@material-ui/core";

const MARKS_MAP = {
  [MARKS.BOLD]: ({ children }) => <b>{children}</b>,
  [MARKS.ITALIC]: ({ children }) => <i>{children}</i>,
  [MARKS.UNDERLINE]: ({ children }) => <u>{children}</u>,
  [MARKS.CODE]: ({ children }) => <code>{children}</code>,
};

const COMPONENTS_MAP = {
  [BLOCKS.HEADING_1]: ({ children }) => <h1>{children}</h1>,
  [BLOCKS.HEADING_2]: ({ children }) => <h2>{children}</h2>,
  [BLOCKS.HEADING_3]: ({ children }) => <h3>{children}</h3>,
  [BLOCKS.HEADING_4]: ({ children }) => <h4>{children}</h4>,
  [BLOCKS.HEADING_5]: ({ children }) => <h5>{children}</h5>,
  [BLOCKS.HEADING_6]: ({ children }) => <h6>{children}</h6>,
  [BLOCKS.PARAGRAPH]: ({ children }) => <p>{children}</p>,
  [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target } }) => <BlockEmbeddedEntry target={target}/>,
  [BLOCKS.UL_LIST]: ({ children }) => <ul>{children}</ul>,
  [BLOCKS.OL_LIST]: ({ children }) => <ol>{children}</ol>,
  [BLOCKS.LIST_ITEM]: ({ children }) => <li>{children}</li>,
  [BLOCKS.QUOTE]: ({ children }) => <Card><CardContent>{children}</CardContent></Card>,
  'text': ({ value }) => value || '',
  [INLINES.ASSET_HYPERLINK]: ({ data, children }) => <SecureAnchor href={data.target.fields.file.url} target="_blank">{children}</SecureAnchor>,
  [INLINES.EMBEDDED_ENTRY]: ({ data: { target } }) => <InlineEmbeddedEntry target={target}/>,
  [INLINES.HYPERLINK]: ({ data: { uri }, children }) => <SecureAnchor href={uri} target="_blank">{children}</SecureAnchor>,
};

const BLOCK_CONTENT = 'BLOCK_CONTENT';
const INLINE_CONTENT = 'INLINE_CONTENT';
const CUSTOM_CONTENTS_MAP = {
  image: {
    [BLOCK_CONTENT]: ({ target }) => (
      target.fields.floatRight
        ? (
          <figure style={{float: 'right'}}>
            <img
              style={{
                width: '240px',
              }}
              src={target.fields.src.fields.file.url}
              alt={target.fields.src.fields.file.title}
            />
            <figcaption>{target.fields.caption}</figcaption>
          </figure>
        )
        : (
          <div>
            <img
              style={{width: '100%'}}
              src={target.fields.src.fields.file.url}
              alt={target.fields.src.fields.file.title}
            />
          </div>
        )
    ),
    [INLINE_CONTENT]: () => 'NOT SUPPORTED',
  },
  advertisement: {
    [BLOCK_CONTENT]: ({ target }) => (
      <div style={{height: '40px', textAlign: 'center', backgroundColor: '#404040'}}>
        ADVERTISEMENT
      </div>
    ),
    [INLINE_CONTENT]: () => 'NOT SUPPORTED',
  }
};

const BlockEmbeddedEntry = ({ target }) => CUSTOM_CONTENTS_MAP[target.sys.contentType.sys.id][BLOCK_CONTENT]({ target });
const InlineEmbeddedEntry = ({ target }) => CUSTOM_CONTENTS_MAP[target.sys.contentType.sys.id][INLINE_CONTENT]({ target });
const SecureAnchor = ({ children, ...rest }) => <a {...rest} rel="noopener noreferrer">{children}</a>;
const Aux = ({ children }) => children;

const attributesToComponent = ({ mapAttributesToComponent, mapMarkToComponent }) => {
  const go = ({ content, marks, ...attributes }) => {
    const children = (content || []).map(go).map((child, index) => <Aux key={index}>{child}</Aux>);
    const component = mapAttributesToComponent({ ...attributes, children });
    return (marks || []).reduce((acc, mark) => (
      mapMarkToComponent({ mark, children: acc })
    ), component);
  };
  return go;
};

export default ({ document }) => document && document.content.map(attributesToComponent({
  mapAttributesToComponent: (props) => {
    try {
      return COMPONENTS_MAP[props.nodeType](props);
    } catch (e) {
      console.error({ e, props });
      return 'FAILED';
    }
  },
  mapMarkToComponent: ({ mark: { type }, children }) => {
    try {
      return MARKS_MAP[type]({ children });
    } catch (e) {
      console.error({ e, type });
      return 'FAILED';
    }
  }
})).map((block, index) => <Aux key={index}>{block}</Aux>);
