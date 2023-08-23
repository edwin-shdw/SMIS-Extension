function unblockImages(): void {
    const storyQuerySelector: string = '.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x10l6tqk.x1ey2m1c.x13vifvy.x17qophe.xds687c.x6ikm8r.x10wlt62.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.xl56j7k';

    const blockerNodes: NodeListOf<HTMLElement> = document.querySelectorAll(`._aagw, ._ac0y, ._ac0x, ${storyQuerySelector}`);
    
    blockerNodes.forEach(node => {
        node.remove();
    });
}

window.addEventListener('contextmenu', unblockImages);

chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
    if(message === 'TikTokScrape') {
        const response = {
            site: 'instagram',
            imgLinks: null,
        }
        sendResponse(response);
    }
});
