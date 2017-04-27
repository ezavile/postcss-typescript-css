import { writeFileSync } from 'fs';
const path = require('path');

import { PostcssTypescriptCss } from './namespace/PostcssTypescriptCss';
import build from './buildFile';

const saveFile = (file: PostcssTypescriptCss.Options) => {
  return new Promise((resolve, reject) => {
    try {
      const dirname = path.dirname(file.cssFileName);
      const extension = path.extname(file.cssFileName);
      const filename = path.basename(file.cssFileName, extension);
      writeFileSync(`${dirname}/${filename}.ts`, build(file));
      resolve(true);
    } catch (err) {
      reject(err.toString());
    }
  });
};

export default saveFile;
