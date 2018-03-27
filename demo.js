'use strict';

const launchDarkly = require('ldclient-node');

const client = launchDarkly.init(
    getEnv('SDK_KEY'),
    {
        offline: false,
        events_uri: 'http://240.0.0.1'
    }
);

console.log('demo: Waiting for ready');
client.once('ready', () => {
    console.log('demo: Getting variation');
    client.variation(getEnv('FEATURE_KEY'), {key: 'xyz'}, false)
        .then((result) => console.log('demo: Got result', result))
        .catch((error) => console.log('demo: Got error', error));
});

function getEnv(name) {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error('Missing environment variable: ' + name);
    }
    return value;
}
