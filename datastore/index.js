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
      callback(error);
    } else {
      callback(null, {id, text: fileData});
    }
  });
};

exports.update = (id, text, callback) => {
  fs.access((path.join((exports.dataDir), `${id}.txt`)), (error) => {
    if (error) {
      callback (error);
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
      callback (error);
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

  /*
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
  */
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
