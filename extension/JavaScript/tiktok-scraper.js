chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'TikTokScrape') {
        sendResponse(scapeTikTokImages());
    }
});
function scapeTikTokImages() {
    const sliders = document.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)");
    const imgLinks = [];
    sliders.forEach((slider) => {
        const imgLink = slider.firstChild.src;
        imgLinks.push(imgLink);
    });
    return imgLinks;
}
