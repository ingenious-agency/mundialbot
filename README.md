# MundialBot⚽️

MundialBot⚽️ is a Slack bot for distributed teams watching the WorldCup

## What problem does it solve?

You know that moment when somebody mentions you on Slack and you are watching your team playing at the WorldCup, you try keep watching the game while answering with your phone just to drop your phone and miss an important play.

MundialBot⚽️ solves it by looking at your timezone to guess your country and looks if your national team is playing, if so it automatically answers the mention with something similar to this:

> _@cherta is watching Uruguay, he'll probably respond after the game ends._

![](example/assets/sample.png)

## Get your own MundialBot⚽️

Here's a step by step to roll out your own MundialBot⚽️

### Get the code

```
$> git clone git@github.com:ingsw-dev/mundialbot.git
$> cd mundialbot
```

### Create the app on Heroku

The easiest way to install it is to deploy the app to Heroku, for that you just need to have the [`heroku-cli`](https://devcenter.heroku.com/articles/heroku-cli), create a new app and add the heroku origin.

[Create a new app](https://dashboard.heroku.com/new-app) on Heroku, then configure the Heroku remote.

```
$> heroku git:remote -a app-name`
$> git push heroku master`
```

## Create a Slack app

Slack apps are a complex beast, you have a tons of options, this is what you need to do:

1. [Create a new slack app](https://api.slack.com/apps/new) selecting a name and a workspace
2. Under the "Add features and functionality" menu select the "Event Subscriptions" option
3. Add the `message.channel` to you "Workspace Events", if you also want to be notified of messages on private channels also add the `message.groups` event as well
4. Go back to the "Event Basic Info" and select Bot under the "Add features and functionality". Create the Bot and name it
5. Go back to the "Event Basic Info" and select "Permissions" under the "Add features and functionality". Copy both API Keys, the first one is the `EVENT_TOKEN` on Heroku config vars and the last one is the `SLACK_TOKEN`
4. Change your config vars on your Heroku app

### Verify your slack app

To verify your slack app to receive events from slack you need to got to "Event Subscriptions" and set the Request url to something like `https://app-name.herokuapp.com/slack/events`. This will fai, don't worry, go to your terminal and type `heroku run npm run verify -a app-name`, this will start a server that will respond to the slack verification, try veryfing again, this time it should work.
