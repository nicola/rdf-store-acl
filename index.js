module.exports = AclStore

var ACL = require('solid-acl')
var AbstractStore = require('rdf-store-abstract')
var util = require('util')

function AclStore (store, opts, accessControl) {
  AbstractStore.call(this, opts)

  var self = this

  opts = opts || {}
  self.store = store

  if (!opts.accessControl) {
    opts.suffix = opts.suffixAcl
    opts.store = self.store
    opts.accessControl = new ACL(opts)
  }

  self.accessControl = opts.accessControl || accessControl
}
util.inherits(AclStore, AbstractStore)

AclStore.prototype.graph = function (iri, callback, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Read', iri, function (err) {
    if (err) return callback(err)
    self.store.graph(iri, callback, options)
  }, options)
}

AclStore.prototype.match = function (iri, subject, predicate, object, callback, limit, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Read', iri, function (err) {
    if (err) return callback(err)
    self.store.match(iri, subject, predicate, object, callback, limit, options)
  }, options)
}

AclStore.prototype.add = function (iri, graph, callback, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Append', iri, function (err) {
    if (err) return callback(err)
    self.store.add(iri, graph, callback, options)
  }, options)
}

AclStore.prototype.merge = function (iri, graph, callback, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Append', iri, function (err) {
    if (err) return callback(err)
    self.store.merge(iri, graph, callback, options)
  }, options)
}

AclStore.prototype.remove = function (iri, graph, callback, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Write', iri, function (err) {
    if (err) return callback(err)
    self.store.remove(iri, graph, callback, options)
  }, options)
}

AclStore.prototype.removeMatches = function (iri, subject, predicate, object, callback, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Write', iri, function (err) {
    if (err) return callback(err)
    self.store.removeMatches(iri, subject, predicate, object, callback, options)
  }, options)
}

AclStore.prototype.delete = function (iri, callback, options) {
  options = options || {}
  var self = this

  self.accessControl.allow(options.user, 'Write', iri, function (err) {
    if (err) return callback(err)
    self.store.delete(iri, callback, options)
  }, options)
}
