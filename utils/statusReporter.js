const chalk = require('chalk');

// Colored console status reporter using the chalk v4 CommonJS API.
function report(label, status) {
  let coloredStatus;
  if (status === 'ok') {
    coloredStatus = chalk.green.bold(status);
  } else if (status === 'warn') {
    coloredStatus = chalk.yellow.bold(status);
  } else {
    coloredStatus = chalk.red.bold(status);
  }

  console.log(`${chalk.blue(label)}: ${coloredStatus}`);
  return status;
}

module.exports = { report };
