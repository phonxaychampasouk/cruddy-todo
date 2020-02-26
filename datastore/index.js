const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const Promise = require('bluebird');



//var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {

  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw ('error reading Id');
    } else {
      fs.writeFile(path.join((exports.dataDir), `${id}.txt`), text, (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null, { id: id, text: text });
        }
      });
    }

  });
};

exports.readOne = (id, callback) => {
  fs.readFile((path.join((exports.dataDir), `${id}.txt`)), 'utf8', (error, fileData) => {
    if (error) {
      callback(error);
    } else {
      callback(null, { id, text: fileData });
    }
  });
};

const promiseReadOne = Promise.promisify(exports.readOne);
const promiseReadDir = Promise.promisify(fs.readdir);

exports.readAll = (callback) => {

  // promiseReadDir(exports.dataDir)
  //   .then((files) => files.map(file =>

  //.then(console.log);

};
/*
fs.readdir(exports.dataDir, (error, files) => {
  if (error) {
    throw ('error reading all files');
  } else {
    let filesObj = files.map(singleFileName =>
      ({
        id: singleFileName.slice(0, -4),
        text: singleFileName.slice(0, -4)
      }));
    callback(null, filesObj);
  }
});
*/


exports.update = (id, text, callback) => {
  fs.access((path.join((exports.dataDir), `${id}.txt`)), (error) => {
    if (error) {
      callback(error);
    } else {
      fs.writeFile(path.join((exports.dataDir), `${id}.txt`), text, (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null, { id: id, text: text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.access((path.join((exports.dataDir), `${id}.txt`)), (error) => {
    if (error) {
      callback(error);
    } else {
      fs.unlink(path.join((exports.dataDir), `${id}.txt`), (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null);
        }
      });
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////



exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
