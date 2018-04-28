'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

global.TEST_DATABASE_URL = 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/userdata';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/api/users', function () {
   const username = 'exampleUser';
   const password = 'examplePass';
   const email = 'example@example.com';
   const usernameB = 'exampleUserB';
   const passwordB = 'examplePassB';
   const emailB = 'exampleB@email.com';

   before(function () {
      return runServer();
   });

   after(function () {
      return closeServer();
   });

   beforeEach(function () {});

   afterEach(function () {
      return User.remove({});
   });

   describe('/api/users', function () {
      describe('POST', function () {
         it('Should reject users with non-string username', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username: 1234,
                  password,
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Incorrect field type: expected string'
                  );
                  expect(res.body.location).to.equal('username');
               });
         });
         it('Should reject users with non-string password', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username,
                  password: 1234,
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Incorrect field type: expected string'
                  );
                  expect(res.body.location).to.equal('password');
               });
         });
      
         it('Should reject users with non-trimmed username', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username: ` ${username} `,
                  password,
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Cannot start or end with whitespace'
                  );
                  expect(res.body.location).to.equal('username');
               });
         });
         it('Should reject usernamesers with non-trimmed password', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username,
                  password: ` ${password} `,
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Cannot start or end with whitespace'
                  );
                  expect(res.body.location).to.equal('password');
               });
         });
         it('Should reject users with username less than four characters', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username: '123',
                  password,
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Must be at least 4 characters long'
                  );
                  expect(res.body.location).to.equal('username');
               });
         });
         it('Should reject users with password less than four characters', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username,
                  password: '123',
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Must be at least 4 characters long'
                  );
                  expect(res.body.location).to.equal('password');
               });
         });
         it('Should reject users with password greater than 25 characters', function () {
            return chai
               .request(app)
               .post('/api/users')
               .send({
                  username,
                  password: new Array(26).fill('a').join(''),
                  email
               })
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Must be at most 25 characters long'
                  );
                  expect(res.body.location).to.equal('password');
               });
         });
         it('Should reject users with duplicate username', function () {
            // Create an initial user
            return User.create({
                  username,
                  password,
                  email
               })
               .then(() =>
                  // Try to create a second user with the same username
                  chai.request(app).post('/api/users').send({
                     username,
                     password,
                     email
                  })
               )
               .then(() =>
                  expect.fail(null, null, 'Request should not succeed')
               )
               .catch(err => {
                  if (err instanceof chai.AssertionError) {
                     throw err;
                  }

                  const res = err.response;
                  expect(res).to.have.status(422);
                  expect(res.body.reason).to.equal('ValidationError');
                  expect(res.body.message).to.equal(
                     'Username already taken'
                  );
                  expect(res.body.location).to.equal('username');
               });
         });
      });
   });
});