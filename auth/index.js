
'use strict';
/*jshint esversion: 6 */
/*jshint node: true;*/

const {router} = require('./router');
const {localStrategy, jwtStrategy} = require('./strategies');

module.exports = {router, localStrategy, jwtStrategy};
