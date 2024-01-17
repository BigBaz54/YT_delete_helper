// ==UserScript==
// @name         YT delete helper
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  YT delete helper for playlists
// @author       BigBaz
// @match        https://www.youtube.com/playlist*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function create_buttons() {
        for (var i=0; i<document.querySelectorAll("#menu.ytd-playlist-video-renderer.style-scope").length;i++) {
            document.querySelectorAll("#menu.ytd-playlist-video-renderer.style-scope")[i].setAttribute("n", i)
        }

        document.querySelectorAll("#menu.ytd-playlist-video-renderer.style-scope").forEach(
            async (e) => {
                const n = e.getAttribute('n');
                e.appendChild(e.children[0].cloneNode());
                const buttons = document.querySelectorAll("[n='"+n.toString()+"']>ytd-menu-renderer>yt-icon-button>#button");
                const newButton = buttons[1];
                await new Promise(r => setTimeout(r, 2000));
                document.querySelectorAll("[n='"+n.toString()+"']>ytd-menu-renderer>yt-icon-button>#button > yt-icon > yt-icon-shape > icon-shape > div > svg > path")[1].setAttribute("d", "M23.6464 0.646446L0.646447 23.6464M0.353554 0.646446L23.3536 23.6464");
                document.querySelectorAll("[n='"+n.toString()+"']>ytd-menu-renderer>yt-icon-button>#button > yt-icon > yt-icon-shape > icon-shape > div > svg > path")[1].setAttribute("stroke", "white");
                newButton.onclick = async () => {
                    document.querySelector("[n='"+n.toString()+"']>ytd-menu-renderer>yt-icon-button>#button").click();
                    document.querySelector("[n='"+n.toString()+"']>ytd-menu-renderer>yt-icon-button>#button").click();
                    await new Promise(r => setTimeout(r, 100));
                    document.querySelector("#items > ytd-menu-service-item-renderer:nth-child(4)").click();
                }
            }
        )
    }

    async function wait_loading() {
        if (document.querySelectorAll('.ytd-playlist-video-list-renderer').length > 50) {
            await new Promise(r => setTimeout(r, 100));
            create_buttons()
        } else {
            console.log('Waiting for loading');
            setTimeout(wait_loading, 200)
        }
    }

    wait_loading()
})();
