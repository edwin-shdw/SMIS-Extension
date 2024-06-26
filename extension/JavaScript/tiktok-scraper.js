chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'TikTokScrape') {
        const response = {
            site: 'tiktok',
            imgLinks: scrapeTikTokImages(),
            pathname: window.location.pathname,
        };
        sendResponse(response);
    }
});
function scrapeTikTokImages() {
    const sliders = document.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)");
    const imgLinks = [];
    sliders.forEach((slider) => {
        const imgLink = slider.firstChild.src;
        imgLinks.push(imgLink);
    });
    return imgLinks;
}
