#!/usr/bin/env node
const { register, next } = require('./extensions-api');
const { readConfig } = require("./readConfig");


const EventType = {
  INVOKE: 'INVOKE',
  SHUTDOWN: 'SHUTDOWN',
};

function handleShutdown(event) {
  console.log('[extension] shutdown', { event });
  process.exit(0);
}
function handleInvoke(event) {
  console.log('[extension] invoke');
}

// extension must to read a file with keys
//
(async function main() {

  console.log('[extension] secrets-manager extension');
  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));

  console.log('[extension] register');
  const extensionId = await register();
  console.log('[extension] extensionId', extensionId);
  await readConfig();
  while (true) {
    console.log('[extension] next');
    const event = await next(extensionId);
    switch (event.eventType) {
      case EventType.SHUTDOWN:
        handleShutdown(event);
        break;
      case EventType.INVOKE:
        handleInvoke(event);
        break;
      default:
        throw new Error('unknown event: ' + event.eventType);
    }
  }
})();

