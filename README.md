# rdf-store-acl

RDF Store that uses a local store or a remote store depending on the IRI.
It follows the [RDF-ext Interface](http://bergos.github.io/rdf-ext-spec/) specification.


## Install

```
npm install --save rdf-store-acl
```

## Usage

You will have to specify a `local` and a `remote` store in the `options`.
If the `host` (see the example) matches the `IRI` of the request,
it means that the file can be accessed by the `local` store, the `remote` will be used otherwise

```javascript
var rdf = require('rdf-ext')
var LdpStore = require('rdf-store-ldp')
var FileStore = require('rdf-store-fs')
var ServerStore = require('rdf-store-server')
var AclStore = require('rdf-store-acl')

var server = ServerStore({
  local: new AclStore(new LdpStore(rdf)),
  remote: new AclStore(new FileStore(rdf))
})

var host = req.protocol + '://' + req.host
var options = {user: userWebID, origin: req.origin}
store(host).graph(host + req.originalUrl, function (graph, err) {
  // This will run on the local store (FileStore)
  // err is an Error object if the user can't access
}, options)

store(host).graph('http://other.tld/resource.tld', function (graph, err) {
  // This will run on the remote store (LdpStore)
}, options)

```


## History

Originally made by [Nicola Greco](https://github.com/nicola)

## Licence

MIT