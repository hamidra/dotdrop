import configCommon from './common.json' assert { type: 'json' };
import types from './types.json' assert { type: 'json' };
import configDevEnv from './development.json' assert { type: 'json' };
import configProdEnv from './production.json' assert { type: 'json' };

const configEnv = import.meta.env.DEV ? configDevEnv : configProdEnv;

const config = { ...configCommon, ...configEnv, types };
console.log(`configs: \n ${JSON.stringify(config)}`);
export default config;
