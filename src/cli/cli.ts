#! /usr/bin/env node
import * as path from 'path';
import { build } from './build';
import { startWatch } from './start-watch';
import { runAngularCli } from './run-angular-cli';
import { Configuration } from './shared/configuration';
import { verifySandboxes } from './verify-sandboxes';

(async () => {
    await run();
})();

async function run() {
    const rawArgs = process.argv.slice(2);
    const config = new Configuration(rawArgs);

    let configFile = path.resolve(config.switches.config.value);
    let playgroundConfig;
    try {
        playgroundConfig = require(configFile.replace(/.json$/, ''));
    } catch (e) {
        process.stdout.write(`[angular-playground]: \x1b[31mFailed to load config file ${configFile}\x1b[0m\n`);
        process.exit(1);
    }

    const sandboxesPath = await build(playgroundConfig.sourceRoot);
    config.port = playgroundConfig.angularCli.port ? playgroundConfig.angularCli.port : 4201;

    if (!config.flags.noWatch.active) {
        startWatch(playgroundConfig, () => build(playgroundConfig.sourceRoot));
    }

    if (!config.flags.noServe.active && playgroundConfig.angularCli) {
        runAngularCli(playgroundConfig.angularCli);
    }

    if (config.flags.runCheckErrors.active) {
        verifySandboxes(config, sandboxesPath);
    }
}
