const {ipcRenderer, contextBridge} = require('electron');
console.log('aaaaaaaaaaaaaaa')
contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        if (['ytLink', 'saveThingy'].includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, callback) => {
        if (['ytThumbRes'].includes(channel)) {
            ipcRenderer.on(channel, ((event, args) => {
                callback(args);
            }));
        }


    }
})
