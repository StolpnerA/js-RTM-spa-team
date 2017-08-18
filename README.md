# js-RTM-spa-team
## Graduation project at HTP (it-academy). Developed in conjunction with [Gleb Borisevich](https://github.com/Space647)

## How to setup

```
# clone repo
git clone https://github.com/StolpnerA/js-RTM-spa-team.git

# go to directory
cd js-RTM-spa-team

# install dependencies
npm install

# run app
gulp
```

## App structure
```
.
├─── index.html
│
├─── files
│       sound.mp3
│
├─── img
│       android-icon-144x144.png
│       android-icon-192x192.png
│       android-icon-36x36.png
│       android-icon-48x48.png
│       android-icon-72x72.png
│       android-icon-96x96.png
│       apple-icon-114x114.png
│       apple-icon-120x120.png
│       apple-icon-144x144.png
│       apple-icon-152x152.png
│       apple-icon-180x180.png
│       apple-icon-57x57.png
│       apple-icon-60x60.png
│       apple-icon-72x72.png
│       apple-icon-76x76.png
│       apple-icon-precomposed.png
│       apple-icon.png
│       favicon-16x16.png
│       favicon-32x32.png
│       favicon-96x96.png
│       favicon.ico
│       group.png
│       ms-icon-144x144.png
│       ms-icon-150x150.png
│       ms-icon-310x310.png
│       ms-icon-70x70.png
│       slackIcon.png
│
├─── script
│    │   app.js
│    │
│    ├───components
│    │       indexPage.js
│    │       mainPage.js
│    │
│    ├───routes
│    │       index.js
│    │       main.js
│    │
│    └───utils
│           eventBus.js
│           RenderTemplate.js
│           router.js
│           SlackAPI.js
│
├─── style
│       browserconfig.xml
│       main.css
│       manifest.json
│
└─── templates
        channelsList.html
        contacts.html
        mainChat.html
        myMsg.html
        opponentMsg.html
```

Authentication
--------------
Для доступа к веб-приложению необходима авторезироваться через `slack Authentication`, указав нужные `scope`.
После потверждения `slack Authentication` выдается `code` на 10 минут для получение `acsses token`.

Get chanels
-----------
Вызвать `API method` `channels.list`.

Get messengers chanel
---------------------
Вызвать `API method` `channels.history`. И подписаться на события через `webSocket` на появление новых сообщений.

Get users list
--------------
Вызвать `API method` `users.list`, для получении список контактов.

Send msg
--------
Вызвать `API method` `chat.postMessage`.

Send location
-------------
Отправка текущего место нахождения, замена тегов с координатоми на карту `yandex`, обработка ссылок и картинок.

Progressive Web Apps
-------------
Данное приложение имеет поддержку `PWA`.

[Презентация](https://goo.gl/pLBMLj)

[Хостинг](http://stolpner.synology.me/slackChat/)

Документация по работе с [APIs slack method](https://api.slack.com/methods), [Real Time Messaging API](https://api.slack.com/rtm).

Используется библиотека [Material design](https://getmdl.io/index.html)
