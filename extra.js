// ==UserScript==
// @name        WebAdRule Extra Script
// @version     1.0.0
// @namespace   http://tampermonkey.net/
// @match       *://*.51cto.com/*
// @match       *://*.segmentfault.com/*
// @match       *://golang.iswbm.com/*
// @match       *://python.iswbm.com/*
// @match       *://www.w3cschool.cn/*
// @match       *://juejin.cn/*
// @match       *://*.didispace.com/*
// @match       *://www.appinn.com/*
// @match       *://fuliba2023.net/*
// @match       *://fuliba2024.net/*
// @match       *://fuliba2025.net/*
// @grant       GM_addStyle
// @run-at      document-start
// @require     https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js
// @author      xndeye
// @description This script is an extension of the Web Ad Rule to fix something that easylist can't handle
// @license MIT
// @downloadURL https://raw.githubusercontent.com/xndeye/web-ad-rule/master/extra.js
// @updateURL https://raw.githubusercontent.com/xndeye/web-ad-rule/master/extra.js
// ==/UserScript==
(function () {
    'use strict';
})();


let domain = null;
function getdomain() {
    if (!domain) {
        domain = document.location.hostname.split('.').slice(-2).join('.')
        console.log('<WebAdRule Extra Script> : ' + domain)
    }
    return domain ? domain : ''
}

/**
 * Inject on document-start
 */
switch (getdomain()) {
    case '51cto.com':
        break
    case 'segmentfault.com':
        break
    case 'iswbm.com':
        window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            let scrollBottom = scrollHeight - scrollTop - clientHeight;
            if (scrollBottom <= 100) {
                $('#read-more-wrap').remove();
                $('.wy-nav-content .rst-content').removeAttr('style');
            }
        }, false)
        break;
    case 'w3cschool.cn':
        break;
    case 'juejin.cn':
        break;
    case 'didispace.com':
        break;
    case 'appinn.com':
        break;
    case 'fuliba2023.net':
    case 'fuliba2024.net':
    case 'fuliba2025.net':
        GM_addStyle('.content-wrap .content {margin-right: 0; !important;}')
        break;
}

/**
 * Execute after page load
 */
window.onload = function () {
    switch (getdomain()) {
        case '51cto.com':
            $("[class^='ad-']").remove();
            setTimeout(function () {
                $(".copy_btn").each(function () {
                    $(this).text('复制');
                    this.setAttribute('class', 'copy-r');
                    this.onclick = function () {
                        var item = $(this.getAttribute('data-clipboard-target'));
                        if (item[0].tagName === 'CODE') {
                            navigator.clipboard.writeText(item.text())
                        } else {
                            navigator.clipboard.writeText(item.siblings().text());
                        }
                    }
                });
            }, 1000);
            break;
        case 'iswbm.com':
            $('.wy-nav-content').attr('style', 'max-width: none');
            $('#read-more-wrap').remove();
            $('.wy-nav-content .rst-content').removeAttr('style');
            break;
        case 'juejin.cn':
            document.oncopy = event => event.clipboardData.setData('text', window.getSelection(0).toString());
            $('a[href]').each(function () {
                console.log($(this).html());
                let link = $(this).attr('href').replace('https://link.juejin.cn?target=', '');
                if (typeof link !== 'undefined') {
                    $(this).attr('href', decodeURIComponent(link));
                }
            })
            break;
        case 'didispace.com':
            $('article').attr('style', 'height: none');
            $('.read-more-wrap').remove();
            break;
        case 'appinn.com':
            $('.latestPost').each(function () {
                if ($(this).find("a[title='View all posts in 团购']").length > 0 ||
                    $(this).find("a[title='View all posts in AD']").length > 0) {
                    $(this).attr("style", "display: none !important;")
                }
            })
            break;
        case 'fuliba2023.net':
        case 'fuliba2024.net':
        case 'fuliba2025.net':
            $('span[style]').attr('style', 'color: green; !important;')
            $('.excerpt').each(function () {
                if ($(this).find('.cat').text().includes('购物网赚')) {
                    $(this).remove()
                }
            })
            break;

        case 'segmentfault.com':
            $('.article a[href]').each(function () {
                if ($(this).attr('href').startsWith('https://link.segmentfault.com')) {
                    $(this).attr('href', $(this).text());
                }
            })
            break;
        default:
            break;
    }
}
