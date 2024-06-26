process.on('message', (msg) => {
  console.log(process.argv0);
  process.send('this is msg from child')
});
