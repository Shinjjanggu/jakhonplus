// ==UserScript==
// @name         JakhonHangle_JP_SERVER
// @namespace    majsoul-plus-korean3
// @version      1.0.0
// @description  Apply majsoul-plus-korean using UserScript!
// @author       YF-DEV, ChatGPT
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
    const RES_BASE_URL = 'https://shinjjanggu.github.io/jakhonplus/korean/';
    const RESOURCEPACK_URL = 'https://shinjjanggu.github.io/jakhonplus/korean/resourcepack.json';
    const SERVER_VERSION_URL = 'https://shinjjanggu.github.io/jakhonplus/korean/version.txt';
    const ANNOUNCE_FILE_URL = 'https://shinjjanggu.github.io/jakhonplus/korean/announce.json';
    const LOCAL_VERSION = '1.0.0';

    const version_re = /v\d+\.\d+\.\d+\.w\//i;

    let resourcepack = null;
    let announce = null;

    async function fetchResourcePack() {
        try {
            const response = await fetch(RESOURCEPACK_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch resourcepack');
            }
            resourcepack = await response.json();
        } catch (error) {
            console.error('Error fetching resourcepack:', error);
        }
    }

    async function fetchServerVersion() {
        try {
            const response = await fetch(SERVER_VERSION_URL, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Failed to fetch server version');
            }
            const serverVersion = await response.text();
            if (serverVersion !== LOCAL_VERSION) {
                const confirmUpdate = confirm("작혼 비공식 한글패치가 새로운 버전 (" + serverVersion + ")으로 업데이트 되었습니다. 업데이트 하시겠습니까? (현재 버전: " + LOCAL_VERSION + ")");
                if (confirmUpdate) {
                    window.open('https://shinjjanggu.github.io/jakhonplus/jakhonhangle_jp.user.js', '_blank');
                }
            }
        } catch (error) {
            console.error('Error fetching server version:', error);
        }
    }

    async function fetchAnnounce() {
        try {
            const response = await fetch(ANNOUNCE_FILE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch announce data');
            }
            announce = await response.json();
        } catch (error) {
            console.error('Error fetching announce data:', error);
        }
    }

    fetchResourcePack();
    fetchServerVersion();
    fetchAnnounce();

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
        if (resourcepack && resourcepack.replace.includes(url)) {
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
        const original_function = uiscript.UI_Info._refreshAnnouncements;
        uiscript.UI_Info._refreshAnnouncements = function (t) {
            t.announcements.forEach((a) => {
                if (announce[a.id]) {
                    a.title = announce[a.id].title;
                    a.content = announce[a.id].content;
                }
            });
            return original_function.call(this, t);
        };
    }

})();
