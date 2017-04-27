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
      file.content.map((c: string) => {
        return ` ${camelCase(c)}: '${c}'\n`;
      })
    ) : (
      Object.keys(file.content).map((c: string) => {
        return ` ${camelCase(c)}: '${(<{[key: string]: string }>file.content)[c]}'\n`;
      })
    )
  },
};
`
);
};

export default build;
