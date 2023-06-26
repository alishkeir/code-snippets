import { reactive } from 'vue';

// Create a reactive bus object
const bus = reactive({
  emit(event, ...args) {
    bus[event]?.forEach((callback) => {
      callback(...args);
    });
  },
  on(event, callback) {
    if (!bus[event]) {
      bus[event] = [];
    }
    bus[event].push(callback);
  },
  off(event, callback) {
    const callbacks = bus[event];
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  },
});

export default bus;

// How to use it

// 1. listen for the event and call the callback function when emitting
//  this.$bus.on('eventName', callbackFunction);

// 2. emit the event
//  this.$bus.emit('eventName');

// 3. remove the event from the bus events list and remove the assigned callback function
//  this.$bus.off('eventName', callbackFunction);
