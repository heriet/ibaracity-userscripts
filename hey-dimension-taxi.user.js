// ==UserScript==
// @name         HeyDimensionTaxi
// @namespace    http://heriet.info/
// @version      1.0
// @description  Ibara City Dimension Taxi Alert
// @author       heriet
// @match        http://lisge.com/ib/act_main.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var enoElem = document.querySelector('.SHIDARI b');
    var eno = enoElem.textContent.match(/\d+/);

    var taxiValue = document.querySelector('#TAXI select.ARE').value;

    if (taxiValue === '0') {
        checkBaseCamp();
    }

    function checkBaseCamp() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://lisge.com/ib/k/now/r" + eno +".html", true);
        xhr.onload = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var wardElem = xhr.responseXML.querySelector('.CIMGNM4 b');
                var ward = wardElem.textContent;

                var areaElem = xhr.responseXML.querySelector('.CIMGNM4');
                var area = String(areaElem.textContent.match(/\w-\d+/));

                if (ward === 'チナミ区' && (area === 'B-4' || area === 'D-2')) {
                window.alert("おい！ 次元タクシー乗れよ！！");
                }
            }
        }
        xhr.responseType = "document";
        xhr.send();
    }
})();