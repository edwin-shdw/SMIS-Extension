const grid = document.getElementById('grid');
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'TikTokScrape', (response) => {
        if (response) {
            setStatus('');
            response.forEach((link) => {
                grid.append(createGridItem(link));
            });
        }
        else {
            setStatus('There is nothing to scrape :(');
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
