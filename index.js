var events = require('events');
var jackrabbit = require('jackrabbit');
var _ = require('highland');

module.exports = function(opts) {
  var ee = new events.EventEmitter();
  var broker = jackrabbit(opts.server);

  var create = _.wrapCallback(function(data, cb) {
    broker.create(opts.queue, cb);
  });

  var handle = function() {
    broker.handle(opts.queue, function(job, ack) {
      ee.emit('job', job, ack);
    });
  };

  var emitError = function(err) { ee.emit('error', err); };

  _('error', broker).each(emitError);
  _('connected', broker).flatMap(create).each(handle);

  return Object.freeze(ee);
}
