### Requirements  
1. Chrome as default browser
2. [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) chrome extension
---
  
### Run Instructions  
1. Download and extract this repository
2. Create a new Tampermonkey userscript
3. Copy paste the contents of `script.js` into the userscript
4. Enable Tampermonkey and run the userscript
5. When you open [Shell Shockers](https://shellshock.io/), the script should automatically run
---

### [swearingiscool.py](https://github.com/WAP-Industries/shelshog-voicechat/blob/main/swearingiscool.py)
If you're wondering why there's a bigass list of buzzwords `script.js`, that's where `swearingiscool.py` comes in.  
JavaScript's built-in speech recognition api is fucking gay, so it censors shit like "nigger" and "cunt".  
  
So the solution was:
- Take Roblox's buzzword file, decrypt and format it with `swearingiscool.py`, and modify it a lil bit
- Then when converting the speech recognition output, just freestyle the decensoring
---

### Sources
[`diogenes.txt`](https://github.com/Vitouliss/ROBLOX-Portable/blob/master/RobloxVersions/version-844560f43f354d3f/content/fonts/diogenes.fnt)  
[Diogenes decryption](https://gist.github.com/pizzaboxer/14e76bf0648d26dc53120cbf3c717ede)
