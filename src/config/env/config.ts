'use strict';

// This code is responsible for getting the value of the NODE_ENV (Environment Variable),
// and call the configuration file according to this variable.

let extension = 'js';

if (process.env.NODE_ENV == 'development') extension = 'ts';

module.exports = () => require(`../env/${process.env.NODE_ENV}.env.${extension}`);
