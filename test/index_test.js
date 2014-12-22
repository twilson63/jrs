var test = require('tap').test;
var jrs = require('../');
var _ = require('highland');

var RABBITMQ = 'amqp://localhost';
var QUEUE = 'foo.bar';

test('handle job from queue', function(t) {
  var svc = jrs({ server: RABBITMQ, queue: QUEUE});
  // receive a job
  _('job', svc, ['job', 'ack'])
    .each(function(req) {

      t.deepEquals(req.job, { beep: 'boop'});
      req.ack();
      t.end();
      process.nextTick(function() { process.exit(0) });
    });

  // send a job
  var jrq = require('jackrabbit')(RABBITMQ);
  _('connected', jrq)
    .flatMap(_.wrapCallback(function(data, cb) {
      jrq.create(QUEUE, cb);
    }))
    .each(function(d) {
      jrq.publish(QUEUE, { beep: 'boop'});
    });
});
