# rdf-store-acl
[![](https://img.shields.io/badge/project-Solid-7C4DFF.svg?style=flat-square)](https://github.com/solid/solid)

> Add ACL support to your store.

It follows the [RDF-ext Interface](http://bergos.github.io/rdf-ext-spec/) specification.


## Install

```
npm install --save rdf-store-acl
```

## Usage

The object constructor is the following:

```Javascript
new AclStore(store, [options, accessControl])
```

The `accessControl` is by default, is set to be a [`solid-acl`](http://npm.im/solid-acl) object, however, you can pass a different ACL lib.

The `options` are passed to the ACL object, for this, see [`solid-acl`](http://npm.im/solid-acl) or any other ACL implementations you are using

## Example

```javascript
var rdf = require('rdf-ext')
var LdpStore = require('rdf-store-ldp')
var FileStore = require('rdf-store-fs')
var ServerStore = require('rdf-store-server')
var AclStore = require('rdf-store-acl')

var server = new ServerStore({
  local: new AclStore(new LdpStore(rdf)),
  remote: new AclStore(new FileStore(rdf))
})

// ...

var options = {agent: userWebID, application: requestOrigin, host: host}
store
  .graph('http://localhost:8080, function (graph, err) {
    // This will run on the local store (FileStore)
    // err is an Error object if the user can't access
  }, options)

store(host)
  .graph('http://other.tld/resource.tld', function (graph, err) {
    // This will run on the remote store (LdpStore)
    // ACL will use LDPStore to figure out permissions
  }, options)

```


## History

Originally made by [Nicola Greco](https://github.com/nicola)

## Licence

MIT
