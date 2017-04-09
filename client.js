/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Created by gavin at 4/9/17 11:47 AM.
 */

 "use strict";

const assert = require('assert-plus');
const clients = require('restify-clients');

let CLIENT = function (options) {
  this.core_addr = options.core_addr;
  this.core_port = options.core_port;


  assert.object(options, "options");
  this.client = clients.createJSONClient({
    url: this.core_addr + ":" + this.core_port,
    version: '0.0.1'
  });
};

CLIENT.prototype.getList = function (opts, callback) {
  this.client.get({
    path:'/api/filelist',
    query: opts
  }, (err, req, res, obj) => {
    if (err) {
      callback(err);
    }
    callback(null, obj);
  });
};

CLIENT.prototype.upload = function (opts, callback) {
  this.client.post('/api/files', opts, (err, req, res, obj) => {
    if (err) {
      callback(err);
    }
    callback(null, obj);
  });
};

CLIENT.prototype.download = function (opts, callback) {
  this.client.get({
    path:'/api/files',
    query: opts
  }, (err, req, res, obj) => {
    if (err) {
      callback(err);
    }
    callback(null, obj);
  });
}

module.exports = {
  createClient: (opts) => {
    return new CLIENT(opts);
  }
};