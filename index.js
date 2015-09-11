'use strict'

var ACL = require('solid-acl')

function AclStore (store, opts, accessControl) {
  var self = this

  opts = opts || {}
  self.store = store

  if (!opts.accessControl) {
    opts.suffix = opts.suffixAcl
    opts.store = self.store
    opts.accessControl = new ACL(opts)
  }

  self.accessControl = opts.accessControl

  self.graph = function (iri, callback, options) {
    options = options || {}
    accessControl.allow(options.user, 'Read', iri, function (err) {
      if (err) return callback(null, err)
      store.graph(iri, callback, options)
    }, options)
  }

  self.match = function (iri, subject, predicate, object, callback, limit, options) {
    options = options || {}
    accessControl.allow(options.user, 'Read', iri, function (err) {
      if (err) return callback(null, err)
      store.match(iri, subject, predicate, object, callback, limit, options)
    }, options)
  }

  self.add = function (iri, graph, callback, options) {
    options = options || {}
    accessControl.allow(options.user, 'Append', iri, function (err) {
      if (err) return callback(null, err)
      store.add(iri, graph, callback, options)
    }, options)
  }

  self.merge = function (iri, graph, callback, options) {
    options = options || {}
    accessControl.allow(options.user, 'Append', iri, function (err) {
      if (err) return callback(null, err)
      store.merge(iri, graph, callback, options)
    }, options)
  }

  self.remove = function (iri, graph, callback, options) {
    options = options || {}
    accessControl.allow(options.user, 'Write', iri, function (err) {
      if (err) return callback(null, err)
      store.remove(iri, graph, callback, options)
    }, options)
  }

  self.removeMatches = function (iri, subject, predicate, object, callback, options) {
    options = options || {}
    accessControl.allow(options.user, 'Write', iri, function (err) {
      if (err) return callback(null, err)
      store.removeMatches(iri, subject, predicate, object, callback, options)
    }, options)
  }

  self.delete = function (iri, callback, options) {
    options = options || {}
    accessControl.allow(options.user, 'Write', iri, function (err) {
      if (err) return callback(null, err)
      store.delete(iri, callback, options)
    }, options)
  }
}

module.exports = AclStore
