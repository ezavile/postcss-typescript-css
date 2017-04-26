import * as postcss from 'postcss';
const parser = require('postcss-selector-parser');

import { PostcssTypescriptCss } from './namespace/PostcssTypescriptCss';
import saveFile from './saveFile';

const postcssTypescriptCss = postcss.plugin<PostcssTypescriptCss.Options>('postcss-typescript-css', (opts) => {
    return (css, result) => {
      return new Promise((resolve, reject) => {
        const classes = new Set();
        css.walk((node: postcss.Rule) => {
          if (node.type === 'rule') {
            parser((selectors: postcss.Rule) => {
              selectors.walk((selector: any) => {
                if (selector.type === 'class') {
                  classes.add(selector.value);
                }
              });
            }).process(node.selector).result;
          }
        });
        opts = {
          cssFileName: css.source.input.file,
          content: [...classes],
        };
        saveFile(opts)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
});

export = postcssTypescriptCss;
