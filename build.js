const { build: runBuild } = require('esbuild');
require('dotenv').config();

/** @type {string[]} */
const options = process.argv.slice(2);

const debug = options.includes('--debug');

const exportEnvKeys = ['IKSM_SESSION', 'SPLATNET_API_URL', 'USER_AGENT'];

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: ['./src/main.ts'],
  platform: 'node',
  bundle: true,
  define: {
    DEBUG: debug,
    ...Object.fromEntries(
      exportEnvKeys.map((key) => [`process.env.${key}`, JSON.stringify(process.env[key])]),
    ),
  },
  outfile: './dist/main.js',
  minify: false,
  minifyIdentifiers: false,
  logLevel: 'info',
};

runBuild(buildOptions).catch((error) => {
  console.error(error);
  process.exit(1);
});
