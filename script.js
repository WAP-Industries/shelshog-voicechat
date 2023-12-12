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

    const Alpha = function(){
        const Upper = Array(26).fill(1).map((_, i)=>String.fromCharCode(65+i)),
            Lower = Upper.map(i=>i.toLowerCase())
        return {Lower: Lower, Upper: Upper}
    }()

    const Font = {
        Lower: ['𝖺','𝖻','𝖼','𝖽','𝖾','𝖿','𝗀','𝗁','𝗂','𝗃','𝗄','𝗅','𝗆','𝗇','𝗈','𝗉','𝗊','𝗋','𝗌','𝗍','𝗎','𝗏','𝗐','𝗑','𝗒','𝗓'],
        Upper: ['𝖠','𝖡','𝖢','𝖣','𝖤','𝖥','𝖦','𝖧','𝖨','𝖩','𝖪','𝖫','𝖬','𝖭','𝖮','𝖯','𝖰','𝖱','𝖲','𝖳','𝖴','𝖵','𝖶','𝖷','𝖸','𝖹']
    }

    function GetText(Text){
        Object.keys(Buzzwords).sort().reverse().forEach(i=>Text = Text.replace(i, Buzzwords[i]))

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

    const Buzzwords = {
        "a******": "asshole",
        "a*******": "assholes",
        "b****": "bitch",
        "b******": "bitches",
        "b*******": "bitching",
        "b*******": "bullshit",
        "b***********": "bullshitting",
        "c***": "cunt",
        "c****": "cunts",
        "c******": "cumshot",
        "f***": "fuck",
        "f****": "fucks",
        "f**": "fag",
        "f*****": "faggots",
        "f******": "fucking",
        "f**********": "fistfucking",
        "f***********": "fistfucking",
        "f************": "fingerfucking",
        "g*******": "gangbang",
        "g********": "gangbangs",
        "g*********": "gangbanged",
        "n****": "nigga",
        "n*****": "nigger",
        "n******": "niggers",
        "p****": "pussy",
        "p******": "pussies",
        "p******": "pornhub",
        "p**********": "pornography",
        "s***": "shit",
        "s****": "shits",
        "s*******": "shitting",
        "w****": "whore",
    }

})();
