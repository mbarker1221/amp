'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true}
});

UserSchema.methods.serialize = function () {
   return {
     // id: this.id,
      username: this.username,
      email: this.email
   };
};

UserSchema.methods.validatePassword = function (password) {
   return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
   return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};