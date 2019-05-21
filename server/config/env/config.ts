let extension: string = 'js';

module.exports = () => require(`../env/${process.env.NODE_ENV}.env.${ extension }`);
