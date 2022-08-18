const fs = require('node:fs/promises');
const path = require('node:path');

const {app, BrowserWindow, screen, ipcMain} = require('electron');
const { menubar } = require('menubar');
const Store = require('electron-store');
const Pusher = require('pusher-js');

const store = new Store();

const pusher = new Pusher('518ab0476ccf565431b1', {
    cluster: "mt1", // if `host` is present, it will override the `cluster` option.
    // useTLS: USE_TLS, // optional, defaults to false
    // host: "HOST", // optional, defaults to api.pusherapp.com
    // port: PORT, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    // encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
});

store.set('uid', 'U02CRLC7A5C');

ipcMain.on('set-uid', (event, uid) => {
    store.set('uid', uid);
    socket.emit('listen', uid);
 });

const easings = require('./modules/easings');

const mb = menubar({
    browserWindow: {
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    }
});

const channel = pusher.subscribe(store.get('uid'));
channel.bind('reaction', (data) => {
    console.log(data);
    showEmoji(data);
});

let reactionTemplate = false;
let win;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const animateWindow = async (window, x) => {
    const { height } = screen.getPrimaryDisplay().workAreaSize;
    await sleep(1500);

    // for(let y = 0; y < height; y = y + 1){
    for(let i = 0; i < height; i = i + 1){
        const y = Math.floor(easings.easeOutSine(i / height) * height);

        // console.log(y);
        window.setBounds({
            width: 150,
            height: 150,
            x: x,
            y: y,
        });

        window.setOpacity( 1 - y / height);

        await sleep(2.5);
    }

    return true;
}

const showEmoji = async (emoji) => {
    const { width } = screen.getPrimaryDisplay().workAreaSize;
    await fs.writeFile('reaction.html', reactionTemplate.replace('EMOJI_HERE', emoji));
    const x = getRandomInt(width - 150);
    const win = new BrowserWindow({
        width: 150, 
        height: 150,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        focusable: false,
        fullscreenable: false,
        skipTaskbar: true,
        show: false,
    });

    win.loadFile('reaction.html');
    win.showInactive();
    win.setPosition(x, 0);
    await animateWindow(win, x);

    win.destroy();
};

// mb.on('after-create-window', () => {
//     mb.window.openDevTools()
// });

app.on('window-all-closed', e => e.preventDefault() );

mb.on('ready', async () => {
	console.log('Menubar app is ready.');
    reactionTemplate = await fs.readFile('reaction.tmpl', 'utf-8');

    
});
