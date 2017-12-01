const { Client } = require('discord-rpc');

const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const clientId = '385907386218708992';
const rpc = new Client({ transport: 'ipc' });

const data = {
    track: undefined,
    playing: undefined,
    time_started: undefined
}

const time_started = new Date();

/**
 * @todo Change ``update()`` and mutate variables outside of ``update()``
 * @param {*} param 
 */
function checkPlaying() {
}

/**
 * @todo Change ``update()`` and mutate variables outside of ``update()``
 * @param {*} param 
 */
async function stateChanged({ track, playing, time_elapsed }) {
}

/**
 * Updater
 * @return {*} RPC Change 
 */
function update() {
    if (!rpc)
        return;


    let filepath = `${process.env.APPDATA}\\Google Play Music Desktop Player\\json_store\\playback.json`
    readFileAsync(filepath, 'utf8').then((_data) => {
        const data = JSON.parse(_data);
        const timestamp = new Date(time_started - (data.time.current));
        if (data.playing == true) {
            rpc.setActivity({
                details: `${data.song.artist} - ${data.song.title}`,
                state: `${data.song.album}`,
                timestamp,
                largeImageKey: 'gpm-logo',
                largeImageText: 'google play music',
                instance: false
            });
        } else {
            rpc.setActivity({
                details: 'Paused',
                state: '',
                timestamp,
                largeImageKey: 'gpm-logo',
                instance: false
            });
        }
        console.log(data);
        console.log(timestamp);
    }).catch(console.error);
}

/**
 * RPC Ready Event
 */
rpc.on('ready', () => {
    console.log('Client ready. Listening for changes.');
    update();
    setInterval(() => update(), 15e3);
});

/**
 * RPC Login Event
 */
rpc.login(clientId).catch(console.error);