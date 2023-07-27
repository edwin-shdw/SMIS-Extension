const grid: HTMLElement = document.getElementById('grid');

chrome.tabs.query({active: true, currentWindow: true}, (tabs): void => {
    chrome.tabs.sendMessage(tabs[0].id, 'TikTokScrape', (response): void => {
        if(response) {
            setStatus('');
            response.forEach((link: string): void => {
                grid.append(createGridItem(link));
            });
        }
        else {
            setStatus('There is nothing to scrape :(');
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
