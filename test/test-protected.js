'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

global.TEST_DATABASE_URL = 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/userdata';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');
const {JWT_SECRET} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Protected endpoint', function () {
   const username = 'exampleUser';
   const password = 'examplePass';
   const email = 'example@example.com';

   before(function () {
      return runServer();
   });

   after(function () {
      return closeServer();
   });

   beforeEach(function () {
      return User.hashPassword(password).then(password =>
         User.create({
            username,
            password,
            email
         })
      );
   });

   afterEach(function () {
      return User.remove({});
   });

   describe('/api/protected', function () {
      it('Should reject requests with no credentials', function () {
         return chai
            .request(app)
            .get('/api/protected')
            .then(() =>
               expect.fail(null, null, 'Request should not succeed')
            )
            .catch(err => {
               if (err instanceof chai.AssertionError) {
                  throw err;
               }

               const res = err.response;
               expect(res).to.have.status(401);
            });
      });

      it('Should reject requests with an invalid token', function () {
         const token = jwt.sign(
         {
               username,
               email
            },
            'wrongSecret', {
               algorithm: 'HS256',
               expiresIn: '7d'
            }
         );

         return chai
            .request(app)
            .get('/api/protected')
            .set('Authorization', `Bearer ${token}`)
            .then(() =>
               expect.fail(null, null, 'Request should not succeed')
            )
            .catch(err => {
               if (err instanceof chai.AssertionError) {
                  throw err;
               }

               const res = err.response;
               expect(res).to.have.status(401);
            });
      });
        it('Should reject requests with an expired token', function () {
         const token = jwt.sign({
               user: {
                  username,
                  email
               },
               exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
            },
            JWT_SECRET, {
               algorithm: 'HS256',
               subject: username
            }
         );

         return chai
            .request(app)
            .get('/api/protected')
            .set('authorization', `Bearer ${token}`)
            .then(() =>
               expect.fail(null, null, 'Request should not succeed')
            )
            .catch(err => {
               if (err instanceof chai.AssertionError) {
                  throw err;
               }

               const res = err.response;
               expect(res).to.have.status(401);
            });
      });

         it('Should send protected data', function() {
      const token = jwt.sign(
        {
          user: {
            username,
            email
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: password,
          expiresIn: '7d'
        }
      );

      return chai
        .request(app)
        .get('/api/protected')
        .set('authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.equal('rosebud');
        });
    });
  });
});
