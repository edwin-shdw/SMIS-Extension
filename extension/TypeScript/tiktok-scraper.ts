chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
    if(message === 'TikTokScrape') {
        const response = {
            site: 'tiktok',
            imgLinks: scrapeTikTokImages(),
        }
        sendResponse(response);
    }
});

function scrapeTikTokImages(): string[] {
    const sliders: NodeListOf<HTMLElement> = document.querySelectorAll(
        ".swiper-slide:not(.swiper-slide-duplicate)"
    );
    const imgLinks: string[] = [];
    sliders.forEach((slider: any): void => {
        const imgLink: string = slider.firstChild.src;
        imgLinks.push(imgLink);
    });

    return imgLinks;
}
