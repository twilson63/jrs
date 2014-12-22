# JRS (Jack Rabbit Micro Serivce)

This module wraps the Jack Rabbit module to make it easy to integrate RabbitMQ
into micro-services via event emitter pattern.

## Usage

``` js

var jrs = require('jrs');

var svc = jrs({ server: 'amqp://localhost', queue: 'foo.bar'});

svc.on('job', function(job, ack) {
  // process job and acknowledge  
  console.log(job);
  ack();
});

svc.on('error', function(err) {
  // handle error
});

```

or with highland

``` js
var jrs = require('jrs');
var _ = require('highland');

var handleJob = /* ... */;
var handleError = /* ... */;

var svc = jrs({ server: 'amqp://localhost', queue: 'foo.bar'});

_('job', svc, ['job', 'ack']).each(handleJob);
_('error', svc).each(handleError);

```

## Install

``` sh
npm install jrs --save
```

## LICENSE

MIT

## Contributing

(see CONTRIBUTING.md)

## Thanks

* Creator of JackRabbit
* Creator of Node
* Creator of OPEN Open Source

## Contributors
