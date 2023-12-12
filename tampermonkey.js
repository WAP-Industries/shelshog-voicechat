// ==UserScript==
// @name         ShellShock Voicechat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  omg shokam
// @author       WAP Industries
// @match        https://shellshock.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const Alpha = function(){
        const Upper = Array(26).fill(1).map((_, i)=>String.fromCharCode(65+i)).join(''),
            Lower = Upper.toLowerCase()
        return {Lower: Lower.split(""), Upper: Upper.split("")}
    }()

    const Font = {
        Lower: ['𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳'],
        Upper: ['𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙']
    }

    const Buzzwords = function(){
        const Words = {
            "n*****": "nigger",
            "f***": "fuck"
        }
        Object.keys(Words).forEach(i=>
            Words[i+"*"] = Words[i]+"s"
        )
        return Words
    }()


    function GetText(Text){
        Object.keys(Buzzwords).forEach(i=>
            Text = Text.replace(i, Buzzwords[i])
        )
        
        Text = Text.split("")
        for (let i=0;i<Text.length;i++){
            for (const Case of ["Lower", "Upper"]){
                if (Alpha[Case].includes(Text[i])){
                    Text[i] = Font[Case][Alpha[Case].indexOf(Text[i])]
                    break
                }
            }
        }

        return Text.join('')
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const Client = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        Client.lang = 'en-US';
        Client.interimResults = false

        // Client.start()
        Client.onresult = (event) => {
            const Div = document.querySelector(".chat-container").childNodes[2]
            
            Div.click()
            Div.value = GetText(event.results[0][0].transcript)
            Div.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true,
                cancelable: true,
            }))
        };
        Client.onend = ()=>{
            Client.start()
        }
    }
    else
        alert('Speech recognition not supported')

})();