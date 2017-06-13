import dev from './dev';
import production from './production';
let config = process.env.NODE_ENV === 'production' ? production : dev;
export default config; 