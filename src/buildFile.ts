const camelCase = require('camelcase');
const path = require('path');

import { PostcssTypescriptCss } from './namespace/PostcssTypescriptCss';

const build = (file: PostcssTypescriptCss.Options) => {
const extension = path.extname(file.cssFileName);
const filename = path.basename(file.cssFileName, extension);
return (
`export const ${filename}Style = {
  ${
    file.content instanceof Array ? (
      file.content.map((c: string, index: number) => {
        const value: string = `${camelCase(c)}: '${c}'\n`;
        if (index === 0) {
          return `${value}`;
        } else {
          return ` ${value}`;
        }
      })
    ) : (
      Object.keys(file.content).map((c: string, index: number) => {
        const value: string = `${camelCase(c)}: '${(<{[key: string]: string }>file.content)[c]}'\n`;
        if (index === 0) {
          return `${value}`;
        } else {
          return ` ${value}`;
        }
      })
    )
  },
};
`
);
};

export default build;
