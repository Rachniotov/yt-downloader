const btn = document.getElementById('btn');
const text = document.getElementById('text');
const preview = document.getElementById('preview');
const form = document.getElementById('form');
let vidID;

form.addEventListener('submit', e => {
    e.preventDefault();
    const link = text.value;

    if (btn.innerText === 'Click to Preview') {
        if (link) {
            window.api.send('ytLink', link);
            console.log('e')
        }
    }
    if (btn.innerText === 'Click to Download') {
        if (vidID && link) {
            window.api.send('saveThingy', {
                id: vidID,
                url: link
            });
        } else {
            window.api.send('saveThingy', `${Date.now()}`);
        }
    }

    // if (!link) {
    //     console.log('aaaaaaaaaa')
    //     let p = document.createElement('p');
    //     p.id = 'temp';
    //     p.innerText = 'Please provide a URL';
    //     document.getElementById('status').appendChild(p);
    //     return;
    // } else if (!link.match('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\\?v=|\\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?\n')) {
    //     if (document.getElementById('temp')) {
    //         document.getElementById('temp').innerText = 'Provide a valid YouTube link';
    //     } else {
    //         let p = document.createElement('p');
    //         p.className = 'font-mono text-red-600 m-2';
    //         p.id = 'temp';
    //         p.innerText = 'Provide a valid YouTube link';
    //         document.getElementById('status').appendChild(p);
    //     }
    // }
});

window.api.receive("ytThumbRes", data => {
    vidID = data.id;
    let preview = document.getElementById('preview');

    let img = document.createElement('img');
    if (!data.thumb) {
        preview.innerText = "Thumbnail couldn't be found";
    } else {
        console.log(data.thumb)
        img.src = data.thumb;
        img.height = 150;
        img.width = 290;
        preview.appendChild(img);

        btn.innerText = 'Click to Download';
    }
});