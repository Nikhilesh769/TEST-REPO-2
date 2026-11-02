// chalk v6 is ESM-only, so it is loaded via dynamic import when available.
let chalkPromise;

function getChalk() {
  if (!chalkPromise) {
    chalkPromise = import('chalk').then((m) => m.default).catch(() => null);
  }
  return chalkPromise;
}

// Colored console status reporter. Falls back to plain output if chalk
// cannot be loaded (e.g. unsupported Node version).
async function report(label, status) {
  const chalk = await getChalk();

  let coloredStatus;
  if (status === 'ok') {
    coloredStatus = chalk ? chalk.green.bold(status) : status;
  } else if (status === 'warn') {
    coloredStatus = chalk ? chalk.yellow.bold(status) : status;
  } else {
    coloredStatus = chalk ? chalk.red.bold(status) : status;
  }

  console.log(`${chalk ? chalk.blue(label) : label}: ${coloredStatus}`);
  return status;
}

module.exports = { report };
