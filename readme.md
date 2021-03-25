:blush: :robot: Publisher Platform :robot: :blush:
---
Your best assistant to publish your contents (post, video, ...) easily, all around the web with **1-click** :)

with **PBot** you don't have to publish every single of your posts one by one on social platforms.

You can consider MBot as the zapier.com **free** alternative.

Supported platforms until now are:
* Linkedin.com article
* D.Tube
* Minds.com blog
* Github.com repository
* Gab.com post
* Wordpress.com post
* And More is coming

TODO:
* Twitter moment
* Medium
* Ecency
* ....

# How to Earn More With Publisher Bot?
It is easy.
The bot will also publish your posts on crypto-based platforms like d.tube.
It will put your desire links in the description. it could be your youtube channel link, your ETH donation address, or whatever.
This will automatically viral your videos because of the massive links!

Installation
======
```bash
git clone `https://github.com/mlibre/pbot.git`
cd pbot
npm i
```

Running
========
Create a user in the `users` folder. You can modify the `sample_user`.
```bash
node pbot.js -u mlibre -h -s minds -s linkedin
node pbot.js -u mlibre -c -h
```

Options:
======
`-u, --user`
> which user (username)

`-c, --closeBrowser`
> Closing browser when it's done.

`-h, --headless`
> run in headless mode

`-s, --sms`
> Social medias


Configuration
======

## defaults.json
`sms`
> Enable, Disable social medias

`defaultUser`
> Default user, username


## Gits

```bash
# for each github repo:
cd users/mlibre/github/
git config --local --unset credential.helper
git config --global --unset credential.helper
# git config --system --unset credential.helper
git config --local credential.helper store
git config user.email "publisherplat@gmail.com" # this user email
git config user.name publisherBot # THIS user's username
git remote -v
# git remote set-url origin https://publisherBot@github.com/publisherBot/contents.git # THIS user git repo address
nano .git/config
# url = https://publisherBot@github.com/publisherBot/contents.git
git pull
nano readme.md
git add --all
git commit -m "hi"
git push origin master 
```

License
=======
No License

Donate or .... :heartpulse:
=======
ETH:
> 0xc9b64496986E7b6D4A68fDF69eF132A35e91838e


TODO
======
* Import mlibre posts https://www.minds.com/settings/other/youtube-migration
