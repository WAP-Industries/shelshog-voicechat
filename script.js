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
    let CanRecord = false,
        HideStatus = null

    const DisplayMessage = (Div, Text)=> Div.innerHTML = `<p><b>${Text}</b></p>`

    const UIStyle = `
        position: absolute;
        margin: auto;
        background-color: rgba(0,0,0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
        user-select: none;`

    const Help = function(){
        const D = document.createElement("div")
        D.id = "ifuckinghateblackniggers"
        D.style=`${UIStyle} top: 0; left: 0; bottom: 0; right: 0;`
        D.style.width = D.style.height = `${window.innerHeight/3}px`
        return D
    }()

    const Status = function(){
        const D = document.createElement("div")
        D.style = `${UIStyle} left: 0; bottom: 10px; transition: width .5s; white-space: nowrap; overflow: hidden`
        D.style.width = "0px"
        D.style.height = `${window.innerHeight/15}px`
        return D
    }()


    const KeyBindings = {
        "v": ["toggle voicechat", ()=>{
            CanRecord = !CanRecord
            Status.style.width = `${parseInt(Status.style.height, 10)*3}px`
            DisplayMessage(Status, `Voicechat: ${["Off", "On"][+CanRecord]}`)
            clearTimeout(HideStatus)
            HideStatus = setTimeout(()=>Status.style.width = "0px", 2000)
        }],
        "h": ["show/hide commands", ()=>{
            if (document.getElementById(Help.id)) Help.remove()
            else document.body.appendChild(Help)

            let Text = "== Shelshog Voicechat ==</br>"
            for (const i of Object.keys(KeyBindings))
                Text+=`</br>[${i}] to ${KeyBindings[i][0]}`
            DisplayMessage(Help, Text)
        }]
    }

    function Init(){
        KeyBindings["h"][1]()
        Array(Help, Status).forEach(i=>document.body.appendChild(i))
    
        window.addEventListener("keyup", (e)=>{
            const Key = e.key.toLowerCase()
            if (Object.keys(KeyBindings).includes(Key)){
                KeyBindings[Key][1]()
            }
        })
    }



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
        Object.keys(Buzzwords).sort().reverse().forEach(i=>Text = Text.replaceAll(i, Buzzwords[i]))

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
        Init()

        const Client = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        Client.lang = 'en-US';
        Client.interimResults = false
        Client.continuous = true
        Client.maxAlternatives = 1

        Client.onresult = (event) => {
            if (!CanRecord) return

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
        "f**": "fag",
        "f***": "fuck",
        "f****": "fucks",
        "f*****": "fucker",
        "f******": "fucking",
        "f*******": "fuckings",
        "f************": "fingerfucking",
        "f*************": "fingerfuckings",
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
