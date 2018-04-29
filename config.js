'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

exports.DATABASE_URL=process.env.DATABASE_URL || global.DATABASE_URL || "mongodb://mbarker1221:shompin1@ds261479.mlab.com:61479/fans";
exports.TEST_DATABASE_URL=process.env.TEST_DATABASE_URL || global.TEST_DATABASE_URL || "mongodb://mbarker1221:shompin1@ds261479.mlab.com:61479/users";
exports.PORT=process.env.PORT || 8080;
exports.JWT_SECRET="C20FE91EBF6958C4C6E673A23C58C3AB6B55C5A768FB0E245B511DB203C2A019";
exports.JWT_EXPIRY=process.env.JWT_EXPIRY || '7d';
