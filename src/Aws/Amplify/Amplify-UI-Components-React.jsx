import React from 'react';

import { JS } from '@aws-amplify/core';

import '@aws-amplify/ui/dist/style.css';
import * as AmplifyUI from '@aws-amplify/ui';
import AmplifyTheme from './Amplify-UI-Theme';

export const beforeAfter = el => {
  const style = el.props.style || {};
  const { before, after } = style;
  if (!before && !after) {
    return el;
  }

  return (
    <span style={{ position: 'relative' }}>
      {before ? <span style={before}>{before.content}</span> : null}
      {el}
      {after ? <span style={after}>{after.content}</span> : null}
    </span>
  );
};

export const propStyle = (props, themeStyle) => {
  const { id, style } = props;
  const styl = Object.assign({}, style, themeStyle);
  if (!id) {
    return styl;
  }

  const selector = `#${id}`;
  Object.assign(styl, styl[selector]);
  return styl;
};

export const Button = props => {
  const theme = props.theme || AmplifyTheme;
  const style = propStyle(props, theme.button);
  const p = JS.objectLessAttributes(props, 'theme');
  return beforeAfter(
    <button {...p} className={AmplifyUI.button} style={style}>
      {props.children}
    </button>
  );
};
