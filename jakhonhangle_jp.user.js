// ==UserScript==
// @name         JakhonHangle_JP_SERVER
// @namespace    majsoul-plus-korean3
// @version      0.0.9
// @description  Apply majsoul-plus-korean using UserScript!
// @author       YF-DEV, SHINJJANGGU, Yudong
// @license      MIT
// @icon         https://shinjjanggu.github.io/jakhonplus/sample/nya1.png
// @supportURL   https://github.com/Shinjjanggu/MajakPlusKorean/issues
// @homepageURL  https://github.com/Shinjjanggu/MajakPlusKorean/
// @downloadURL  https://shinjjanggu.github.io/jakhonplus/jakhonhangle_jp.user.js
// @updateURL    https://shinjjanggu.github.io/jakhonplus/jakhonhangle_jp.user.js
// @include      https://game.mahjongsoul.com/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(async function () {
    'use strict';
    const GAME_BASE_URL = 'https://game.mahjongsoul.com/';
    const RESOURCEPACK_URL = 'https://cdn.jsdelivr.net/gh/shinjjanggu/jakhonplus/korean/resourcepack.json';
    const RES_BASE_URL = 'https://cdn.jsdelivr.net/gh/shinjjanggu/jakhonplus/korean/';
    const ANNOUNCE_FILE_URL = RES_BASE_URL + 'announce.json';

    const version_re = /v\d+\.\d+\.\d+\.w\//i;

    const resourcepack = await(await fetch(RESOURCEPACK_URL)).json();
    const announce = await(await fetch(ANNOUNCE_FILE_URL)).json();

    replaceXhrOpen();
    replaceCodeScript();

    function replaceCodeScript() {
        let observer = null;
        observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                const scripts = document.getElementsByTagName('script');
                for (let i = 0; i < scripts.length; i++) {
                    const script = scripts[i];
                    if (script.src && script.src.indexOf('code.js') !== -1) {
                        script.onload = function () {
                            replaceLayaLoadImage();
                            replaceLayaLoadSound();
                            replaceLayaLoadTtf();
                            replaceAnnounce();
                        };
                        observer.disconnect();
                    }
                }
            });
        });
        const config = {
            childList: true,
            subtree: true
        };
        observer.observe(document, config);
    }

    function updateUrl(url) {
        const original_url = url;
        if (url.startsWith(GAME_BASE_URL)) {
            url = url.substring(GAME_BASE_URL.length);
        }
        url = url.replace(version_re, '');
        if (resourcepack.replace.includes(url)) {
            url = RES_BASE_URL + 'assets/' + url;
            console.log(url);
            return url;
        } else {
            return original_url;
        }
    }

    function replaceXhrOpen() {
        const original_function = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            return original_function.call(this, method, updateUrl(url), async, user, password);
        };
    }

    function replaceLayaLoadImage() {
        const original_function = Laya.Loader.prototype._loadImage;
        Laya.Loader.prototype._loadImage = function (url) {
            return original_function.call(this, updateUrl(url));
        }
    }

    function replaceLayaLoadSound() {
        const original_function = Laya.Loader.prototype._loadSound;
        Laya.Loader.prototype._loadSound = function (url) {
            return original_function.call(this, updateUrl(url));
        }
    }

    function replaceLayaLoadTtf() {
        const original_function = Laya.Loader.prototype._loadTTF;
        Laya.Loader.prototype._loadTTF = function (url) {
            return original_function.call(this, updateUrl(url));
        }
    }

    function replaceAnnounce() {
        const original_function = uiscript.UI_Info._refreshAnnouncements
        uiscript.UI_Info._refreshAnnouncements = function (t) {
            t.announcements.forEach((a)=> {
                if (announce[a.id]) {
                    a.title = announce[a.id].title
                    a.content = announce[a.id].content
                }
            })
            return original_function.call(this, t)
        }
    }

})();
