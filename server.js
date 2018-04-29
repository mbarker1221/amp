'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const {router: usersRouter } = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
   });
});

app.get('/fans', (req, res) => {
  Fan
    .find()
    .limit(10)
    .then(fans => {
      res.json({
        fans: fans.map(
          (fan) => fan.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Did not get'});
    });
});

app.get('/fans/:id', (req, res) => {
  Fan
    .findById(req.params.id)
    .then(fan => res.json(fan.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

app.get('/fans', (req, res) => {
    const filters = {};
    const queryableFields = ['username', 'password'];
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
    });
    Fan
        .find(filters)
        .then(Fans => res.json(
            Fans.map(fan => fan.serialize())
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});


app.post('/fans', (req, res) => {

  const requiredFields = ['username', 'password', 'email'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Fan
    .create({
     username: req.body.username,
     password: req.body.password,
     email: req.body.email
    })
    .then(fan => res.status(201).json(fan.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Did not create'});
    });
});


app.put('/fans/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({message: message});
  }
  const toUpdate = {};
  const updateableFields = ['username', 'password'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Fan
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(fan => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Did not update'}));
});

app.delete('/fans/:id', (req, res) => {
  Fan
    .findByIdAndRemove(req.params.id)
    .then(fan => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Did not delete'}));
});

app.use('*', function (req, res) {
  res.status(404).json({message: 'Other * error'});
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, 'Unhandled Rejection at Promise', promise);
   })
   .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
   });

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};






//app.get('/', (req, res) => {
  // res.sendFile(__dirname + "/public/index.html");
//}); 

//app.get('/', function (req, res) {
//   throw new Error('oh no!');
//});

//app.use(function (err, req, res, next) {
  // console.log(err.message);
//});
/*
app.use('*', (req, res) => {
   return res.status(404).json({message: 'Not Found'});
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, 'Unhandled Rejection at Promise', promise);
   })
   .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
   });

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
*/