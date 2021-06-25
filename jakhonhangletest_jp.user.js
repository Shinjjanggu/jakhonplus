// ==UserScript==
// @name         JakhonHangle_JP_SERVER
// @namespace    majsoul-plus-korean3
// @version      0.0.5
// @description  jakhon korean test
// @author       YF-DEV
// @license      MIT
// @icon         https://shinjjanggu.github.io/jakhonplus/sample/nya1.png
// @supportURL   https://github.com/Shinjjanggu/MajakPlusKorean/issues
// @homepageURL  https://github.com/Shinjjanggu/MajakPlusKorean/
// @downloadURL  https://shinjjanggu.github.io/jakhonplus/jakhonhangletest_jp.user.js
// @updateURL    https://shinjjanggu.github.io/jakhonplus/jakhonhangletest_jp.user.js
// @include      https://game.mahjongsoul.com/*
// @grant        unsafeWindow
// @grant        GM_getResourceText
// @run-at       document-start
// @resource resourcepack https://shinjjanggu.github.io/jakhonplus/korean/resourcepack.json
// ==/UserScript==

(function () {
    'use strict';
    const GAME_BASE_URL = 'https://game.mahjongsoul.com/';
    const MAJSOUL_PLUS_BASE_URL = 'https://localhost:8887/';
    const RES_BASE_URL = 'https://shinjjanggu.github.io/jakhonplus/korean/';
    const RESOURCEPACK_URL = 'https://shinjjanggu.github.io/jakhonplus/korean/resourcepack.json';
    const version_re = /v\d+\.\d+\.\d+\.w\//i;

    let resourcepack = null;

    replaceCodeScript();

    if ('function' === typeof GM_getResourceText) {
        resourcepack = JSON.parse(GM_getResourceText('resourcepack'));
    } else {
        var resourcepack_xhr = new XMLHttpRequest();
        resourcepack_xhr.open("GET", RESOURCEPACK_URL, false);
        resourcepack_xhr.send();
        resourcepack = JSON.parse(resourcepack_xhr.response);
    }

    replaceXhrOpen();

    function replaceCodeScript() {
        console.log(window.Laya);
        if (window.Laya !== undefined && window.Laya.Loader !== undefined && window.Laya.Loader.prototype !== undefined) {
            replaceLayaLoadImage();
            replaceLayaLoadSound();
            replaceLayaLoadTtf();
            return;
        }
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
        // console.log('original url: ' + url);
        if (url.startsWith(GAME_BASE_URL)) {
            url = url.substring(GAME_BASE_URL.length);
        }
        if (url.startsWith(MAJSOUL_PLUS_BASE_URL)) {
            url = url.substring(MAJSOUL_PLUS_BASE_URL.length);
        }
        url = url.replace(version_re, '');
        if (resourcepack.replace.includes(url)) {
            url = RES_BASE_URL + 'assets/' + url;
            console.log(' updated url: ' + url);
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
})();
