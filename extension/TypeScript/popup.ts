const grid: HTMLElement = document.getElementById('grid');
const openAllBtn: HTMLElement = document.getElementById('openAll');

let links: string[] = [];

openAllBtn.addEventListener('click', (): void => {
    if(links) {
        links.forEach((link: string): void => {
            chrome.tabs.create({ url: link }, null);
        });
    }
});

chrome.tabs.query({active: true, currentWindow: true}, (tabs): void => {
    chrome.tabs.sendMessage(tabs[0].id, 'TikTokScrape', (response): void => {
        if(response.imgLinks && response.imgLinks.length) {
            setStatus('');
            links = response.imgLinks;
            response.imgLinks.forEach((link: string): void => {
                grid.append(createGridItem(link));
            });
        }
        else if(response.site === 'instagram') {
            setStatus('Images unblocked! Just right click on them :)');
        }
        else {
            setStatus('There is nothing to scrape :(');
            openAllBtn.setAttribute('disabled', 'true');
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
