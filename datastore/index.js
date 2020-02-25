const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

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

exports.readAll = (callback) => {
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
};

exports.readOne = (id, callback) => {
  fs.readFile((path.join((exports.dataDir), `${id}.txt`)), 'utf8', (error, fileData) => {
    if (error) {
      console.log('error');
    } else {
      console.log(fileData);
      callback(null, fileData);
    }
  });
};
// var text = items[id];
// if (!text) {
//   callback(new Error(`No item with id: ${id}`));
// } else {
//   callback(null, { id, text });

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
