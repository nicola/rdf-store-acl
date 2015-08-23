'use strict'

var ACL = require('solid-acl')

function AclStore (store, accessControl, options) {
  var self = this

  options = options || {}
  self.store = store
  self.accessControl = options.accessControl || new ACL(store, options)

  self.graph = function (iri, callback, options) {
    accessControl.allow(options.user, 'Read', iri, function (err) {
      if (err) return callback(null, err)
      store.graph(iri, callback, options)
    }, options)
  }

  self.match = function (iri, subject, predicate, object, callback, limit) {
    accessControl.allow(options.user, 'Read', iri, function (err) {
      if (err) return callback(null, err)
      store.match(iri, subject, predicate, object, callback, limit)
    }, options)
  }

  self.add = function (iri, graph, callback, options) {
    accessControl.allow(options.user, 'Append', iri, function (err) {
      if (err) return callback(null, err)
      store.add(iri, graph, callback, options)
    }, options)
  }

  self.merge = function (iri, graph, callback, options) {
    accessControl.allow(options.user, 'Append', iri, function (err) {
      if (err) return callback(null, err)
      store.merge(iri, graph, callback, options)
    }, options)
  }

  self.remove = function (iri, graph, callback) {
    accessControl.allow(options.user, 'Write', iri, function (err) {
      if (err) return callback(null, err)
      store.remove(iri, graph, callback)
    }, options)
  }

  self.removeMatches = function (iri, subject, predicate, object, callback) {
    accessControl.allow(options.user, 'Write', iri, function (err) {
      if (err) return callback(null, err)
      store.removeMatches(iri, subject, predicate, object, callback)
    }, options)
  }

  self.delete = function (iri, callback) {
    accessControl.allow(options.user, 'Write', iri, function (err) {
      if (err) return callback(null, err)
      store.delete(iri, callback)
    }, options)
  }
}

module.exports = AclStore
