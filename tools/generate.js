import path from 'path';
import { writeFile, makeDir } from './lib/fs';
import run from './run';

export async function component() {
  const { codename } = getNames();

  const basePath = path.resolve(`src/components/${codename}`);
  const filepathPackage = path.join(basePath, 'package.json');
  const filepathComponent = path.join(basePath, `${codename}.js`);
  const filepathCSS = path.join(basePath, `${codename}.css`);

  if (process.argv.includes('--container')) {
    await run(container);
  }

  const toWrite = {
    [filepathPackage]: localPackageContents(codename),
    [filepathComponent]: `import React from 'react';\nimport PropTypes from 'prop-types';\nimport withStyles from 'isomorphic-style-loader/lib/withStyles';\n\nimport s from './${codename}.css';\n\nclass ${codename} extends React.Component {\n  static propTypes = {};\n  static defaultProps = {};\n\n  render() {\n    return (\n      <div className={s.root}>\n        <div className={s.container}>\n        </div>\n      </div>\n    );\n  }\n}\n\nexport default withStyles(s)(${codename});\n`,
    [filepathCSS]: cssContents('..'),
  };

  await writeFiles(toWrite);
}

export async function container() {
  const { codename } = getNames();
  const containerName = `${codename}Container`;

  const basePath = path.resolve(`src/containers/${containerName}`);
  const filepathPackage = path.join(basePath, 'package.json');
  const filepathContainer = path.join(basePath, `${containerName}.js`);

  const toWrite = {
    [filepathPackage]: localPackageContents(containerName),
    [filepathContainer]: `import React from 'react';\nimport { connect } from 'react-redux';\nimport ${codename} from '../../components/${codename}';\n\nfunction mapStateToProps(state) {\n  return {};\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {};\n}\n\nexport default connect(mapStateToProps, mapDispatchToProps)(${codename});\n`,
  };

  await writeFiles(toWrite);
}

export async function route() {
  const { codename, filename } = getNames();

  const basePath = path.resolve(`src/routes/${filename}`);
  const filepathIndex = path.join(basePath, 'index.js');
  const filepathRoute = path.join(basePath, `${codename}.js`);
  const filepathCSS = path.join(basePath, `${codename}.css`);

  const toWrite = {
    [filepathIndex]: `import React from 'react';\nimport Layout from '../../components/Layout';\nimport ${codename} from './${codename}';\n\nexport default {\n  path: '/${filename}',\n\n  action() {\n    return {\n      title: '${codename}',\n      component: <Layout><${codename} /></Layout>,\n    };\n  },\n};\n`,
    [filepathRoute]: `import React from 'react';\nimport PropTypes from 'prop-types';\nimport withStyles from 'isomorphic-style-loader/lib/withStyles';\nimport s from './${codename}.css';\n\nclass ${codename} extends React.Component {\n  render() {\n    return (\n      <div className={s.root}>\n        <div className={s.container}>\n        </div>\n      </div>\n    );\n  }\n}\n\nexport default withStyles(s)(${codename});\n`,
    [filepathCSS]: cssContents('../..'),
  };

  await writeFiles(toWrite);
}

function getNames() {
  if (process.argv.length < 4) {
    throw new Error('No name provided');
  }

  const codename = process.argv[3];
  const filename = codename[0].toLowerCase() + codename.slice(1);
  if (codename === filename) {
    throw new Error('Name should start with a capital letter:', codename);
  }

  return { codename, filename };
}

function writeFiles(fileMap) {
  return Promise.all(
    Object.keys(fileMap).map(async filepath => {
      const folder = path.dirname(filepath);
      await makeDir(folder);
      await writeFile(filepath, fileMap[filepath]);
    })
  );
}

function localPackageContents(codename) {
  return `{\n  "name": "${codename}",\n  "version": "0.0.0",\n  "private": true,\n  "main": "./${codename}.js"\n}\n`;
}

function cssContents(folderPrefix) {
  return `@import '${folderPrefix}/base.css';\n\n.root {\n}\n\n.container {\n}\n`;
}
