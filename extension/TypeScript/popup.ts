const grid: HTMLElement = document.getElementById('grid');
const qrCodeField = document.getElementById('qr-code');
const openAllBtn: HTMLElement = document.getElementById('openAll');

let links: string[] = [];

openAllBtn.addEventListener('click', (): void => {
    if(links) {
        links.forEach((link: string): void => {
            chrome.tabs.create({ url: link }, null);
        });
    }
});

function getTikTokVideoId(pathname: string) {
    const paths = pathname.split('/');
    if(paths[paths.length - 2] !== 'video') return false;
    return paths[paths.length - 1];
}

chrome.tabs.query({active: true, currentWindow: true}, (tabs): void => {
    chrome.tabs.sendMessage(tabs[0].id, 'TikTokScrape', (response): void => {
        if(!response) {
            setStatus('This extension currently does not support this site :(');
            openAllBtn.setAttribute('disabled', 'true');
            chrome.runtime.lastError.message;
        }
        else if(response.imgLinks && response.imgLinks.length < 1) {
            const videoId = getTikTokVideoId(response.pathname);
            if(videoId) {
                setStatus('');
                const downloadLink = `https://tikcdn.io/ssstik/${videoId}`;
                document.getElementById('openAll').classList.add('d-none');
                const downloadBtn = document.getElementById('download') as HTMLAnchorElement;
                downloadBtn.classList.remove('d-none');
                downloadBtn.href = downloadLink;
                downloadBtn.target = '_blank';

                const imgNode = document.createElement('img');
                imgNode.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${downloadLink}`;
                imgNode.alt = 'Image';
                qrCodeField.append(imgNode);
            }
            else {
                setStatus('There is nothing to scrape :(');
            }
            openAllBtn.setAttribute('disabled', 'true');
        }
        else if(response.imgLinks && response.imgLinks.length) {
            setStatus('');
            links = response.imgLinks;
            response.imgLinks.forEach((link: string): void => {
                grid.append(createGridItem(link));
            });
        }
        else if(response.site === 'instagram') {
            setStatus('Images unblocked! Just right click on them :)');
        }
    });
});

function setStatus(msg: string): void {
    document.getElementById('status').innerText = msg;
}

function createGridItem(link: string): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    const a: HTMLAnchorElement = document.createElement('a');
    const img: HTMLImageElement = document.createElement('img');

    img.src = link;

    a.href = link;
    a.target = '_blank';
    a.classList.add('card', 'card-hover');
    a.append(img);

    div.classList.add('col');
    div.append(a);

    return div;
}
