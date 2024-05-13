// ffmpeg
// 使用ffmpeg将视频转变成gif
const { execSync } = require('child_process');
const { resolve } = require('path');
const mp4File = resolve(__dirname, './test/test.mp4');
const gifFile = resolve(__dirname, './test/test.gif');
execSync(`ffmpeg -i ${mp4File} ${gifFile}`, { stdio: 'inherit' });
