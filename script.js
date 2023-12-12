// ==UserScript==
// @name         shelshog voicechat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  the shell do be shocking
// @author       WAP Industries
// @match        https://shellshock.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const Buzzwords = function(){
        const Words = {
            "n*****": "nigger",
            "f***": "fuck"
        }
        return Words
    }()

    const Alpha = function(){
        const Upper = Array(26).fill(1).map((_, i)=>String.fromCharCode(65+i)),
            Lower = Upper.map(i=>i.toLowerCase())
        return {Lower: Lower, Upper: Upper}
    }()

    const Font = {
        Lower: ['𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳'],
        Upper: ['𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙']
    }

    function GetText(Text){
        Object.keys(Buzzwords).forEach(i=>Text = Text.replace(i, Buzzwords[i]))

        Text = Text.split("")
        for (let i=0;i<Text.length;i++){
            const Case = ["Lower", "Upper"].filter(c=>Alpha[c].includes(Text[i]))[0]
            if (!Case) continue
            Text[i] = Font[Case][Alpha[Case].indexOf(Text[i])]
        }

        return Text.join('')
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        alert("shelshog voicechat started")

        const Client = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        Client.lang = 'en-US';
        Client.interimResults = false
        Client.continuous = true
        Client.maxAlternatives = 1

        Client.onresult = (event) => {
            const Div = document.querySelector(".chat-container")?.childNodes[2]
            if (!Div) return

            Div.click()
            Div.value = GetText(event.results[event.results.length-1][0].transcript.toLowerCase())
            Div.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true,
                cancelable: true,
            }))
        }

        Client.onend = ()=> Client.start()

        Client.start()
    }
    else
        alert('shelshog voicechat not supported')

})();
