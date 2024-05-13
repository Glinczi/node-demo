/**
 * events
 */
const EventEmitter = require('events');

// 订阅发布模式

const event = new EventEmitter();

event.on('text-event', (data) => {
  console.log('text-event监听的事件：', data);
});

event.emit('text-event', '这是text-event派发的事件');
event.emit('text-event', '这是text-event派发的事件');

/**
 * 监听的消息数量默认10个
 * 可以通过 setMaxListeners 解除限制
 */
event.setMaxListeners(20);

/**
 * 触发一次事件
 */

event.once('once-event', (data) => {
  console.log('once-event', data);
});

event.emit('once-event', '只触发一次事件');
event.emit('once-event', '只触发一次事件');

/**
 * 如何关闭监听 监听的回调需要使用同一个函数
 */
const handleMsg = (msg) => {
  console.log('12321', msg);
};

event.on('off-event', handleMsg);
event.emit('off-event', '测试off-event');
event.off('off-event', handleMsg);
event.emit('off-event', '测试off-event2');
