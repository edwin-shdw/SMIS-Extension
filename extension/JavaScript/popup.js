const grid = document.getElementById('grid');
const openAllBtn = document.getElementById('openAll');
let links = [];
openAllBtn.addEventListener('click', () => {
    if (links) {
        links.forEach((link) => {
            chrome.tabs.create({ url: link }, null);
        });
    }
});
function getTikTokVideoId(pathname) {
    const paths = pathname.split('/');
    if (paths[paths.length - 2] !== 'video')
        return false;
    return paths[paths.length - 1];
}
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'TikTokScrape', (response) => {
        if (!response) {
            setStatus('This extension currently does not support this site :(');
            openAllBtn.setAttribute('disabled', 'true');
            chrome.runtime.lastError.message;
        }
        else if (response.imgLinks && response.imgLinks.length < 1) {
            const videoId = getTikTokVideoId(response.pathname);
            if (videoId) {
                setStatus('');
                document.getElementById('openAll').classList.add('d-none');
                const downloadBtn = document.getElementById('download');
                downloadBtn.classList.remove('d-none');
                downloadBtn.href = `https://tikcdn.io/ssstik/${videoId}`;
                downloadBtn.target = '_blank';
            }
            else {
                setStatus('There is nothing to scrape :(');
            }
            openAllBtn.setAttribute('disabled', 'true');
        }
        else if (response.imgLinks && response.imgLinks.length) {
            setStatus('');
            links = response.imgLinks;
            response.imgLinks.forEach((link) => {
                grid.append(createGridItem(link));
            });
        }
        else if (response.site === 'instagram') {
            setStatus('Images unblocked! Just right click on them :)');
        }
    });
});
function setStatus(msg) {
    document.getElementById('status').innerText = msg;
}
function createGridItem(link) {
    const div = document.createElement('div');
    const a = document.createElement('a');
    const img = document.createElement('img');
    img.src = link;
    a.href = link;
    a.target = '_blank';
    a.classList.add('card', 'card-hover');
    a.append(img);
    div.classList.add('col');
    div.append(a);
    return div;
}
