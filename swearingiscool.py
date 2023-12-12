from itertools import cycle
import os, json

Words = {}

def main():
    for i in open("diogenes.txt", "r").readlines():
        word = ''.join(chr(ord(c)^ord(k)) for c,k in zip(i.strip(), cycle("U")))
        if len([c for c in word if not c.isalpha()]): continue
        Words[f"{word[0]}{''.join(['*' for _ in word[1:]])}"] = word
    with open("swears.txt", "w") as f:
        f.write(json.dumps(Words, indent=4))


if __name__=="__main__":
    main()