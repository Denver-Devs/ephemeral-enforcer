# ephembot <sup>[![Version Badge](http://vb.teelaun.ch/LegitTalon/ephembot.svg)](https://npmjs.org/package/ephembot)</sup>

[![Build Status](https://drone.io/github.com/Denver-Devs/ephemeral-enforcer/status.png)](https://drone.io/github.com/Denver-Devs/ephemeral-enforcer/latest)

A slack bot that deletes messages for ephemerality sake!

# How to use

## Install

### Via NPM (preferred)
```shell
npm install --global ephembot
ephembot -p 3000
```

### Docker (soon to be preferred)

*coming soon*

### Git clone
```shell
git clone https://github.com/Denver-Devs/ephemeral-enforcer.git
cd ephemeral-enforcer
```

`npm start` will run ephembot on port 3000.

You can also install ephembot globally or `npm link` from inside the repo and 
run `ephembot -p 4000` which will run it on port 4000. Choose whatever port you
want.

## Configure slack

Add a slash command to your slack organization that POSTs to 
`<your server>:<your port>/ephemeral`

Name the slash command whatever. Traditionally it is `/ephemeral`

## Commands

Ephembot runs only in the channel from which the command is used this allows for
per-channel configuration.

Setting ephembot's level tells it to delete messages that are older than the
level. ex. `/ephemeral level 20 minutes` will tell ephembot to delete messages
that are older than 20 minutes, every 20 minutes.

### /ephemeral on

Turns ephembot on at the default interval 15 minutes for the current channel

### /ephemeral off

Turns ephembot off for the current channel

### /ephemeral level \<15 minutes | 1 hour | 30 seconds\>

Turns ephembot on at the given interval for the current channel

### /ephemeral status

Responds with the current channels level

# Issues

If you have any issues with ephembot [feel free to submit them here][issues]

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

[issues]: https://github.com/Denver-Devs/ephemeral-enforcer/issues
