require('dotenv').config();
const { spawn } = require('child_process');

const run = (cmd, params) => {
  const command = spawn(cmd, params);
  command.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  command.stderr.on('data', (data) => {
    console.log(`${data}`);
  });
  command.on('close', (code) => {
    console.log(`Closed. Exit code ${code}`);
  });
}

if (process.env.NODE_ENV === 'production') {
  run("npm", ["run", "build"])
}
else {
  run("npm", ["start"])
}