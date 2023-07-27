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
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'TikTokScrape', (response) => {
        if (response === null || response === void 0 ? void 0 : response.length) {
            setStatus('');
            links = response;
            response.forEach((link) => {
                grid.append(createGridItem(link));
            });
        }
        else {
            setStatus('There is nothing to scrape :(');
            openAllBtn.setAttribute('disabled', 'true');
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
