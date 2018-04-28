'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);


describe('User', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should list items on GET', function() {
  
    return chai.request(app)
      .get('/users')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);     
        });
      });
  });

 
  it('should add a user on POST', function() {
    const newuser = {username: 'username', password: "password", email: "email@email.com"};
    return chai.request(app)
      .post('/user')
      .send(newuser)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'username', 'password', 'email');
        expect(res.body.id).to.not.equal(null);
       
        expect(res.body).to.deep.equal(Object.assign(newuser, {id: res.body.id}));
      });
  });

  it('should update user on PUT', function() {
    
    const updateData = {
      username: 'foos',
      password: 'buzz',
      email: 'foo@email.com'
    };

    return chai.request(app)
      
      .get('/user')
      .then(function(res) {
        updateData.id = res.body[0].id;
        
        return chai.request(app)
          .put(`/user/${updateData.id}`)
          .send(updateData);
      })
    
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.deep.equal(updateData);
      });
  });

 
  it('should delete user on DELETE', function() {
    return chai.request(app)
     
      .get('/user')
      .then(function(res) {
        return chai.request(app)
          .delete(`/user/${res.body[0].id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });

