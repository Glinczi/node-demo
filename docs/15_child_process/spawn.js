const { spawn } = require('node:child_process');

const spawnTask = spawn('netstat');

spawnTask.stdout.on('data', (data) => {
  console.log(data.toString()); // 实时返回，返回的是Buffer，需要转字符串
});
spawnTask.stdout.on('close', () => {
  console.log('its close');
});
