# js-RTM-spa-team
## Graduation project at HTP (it-academy). Developed in conjunction with [Gleb Borisevich](https://github.com/Space647)


Данное приложение должно иметь поддержку `PWA`.


Authentication
--------------
Для доступка к веб-приложению неоходима авторезироваться через `slack Authentication`, указав нужные `scope`.
После потверждения `slack Authentication` выдается `code` на 30 минут для получение `acsses token`.

Get chanels
-----------
Вызывать `API method` `channels.list`.

Get messengers chanel
---------------------
Вызывать `API method` `channels.history`. И подписаться на события через `webSocket` на появление новых сообщений.

Get users list
--------------
Вызывать `API method` `users.list`, для получении список контактов.

Send msg
--------
Вызывать `API method` `chat.postMessage`.

Send location
-------------
Отправка текущего место нахождения, замена тегов с координатоми на карту `google`. (если получится)


Документация по работе с [APIs slack method](https://api.slack.com/methods), [Real Time Messaging API](https://api.slack.com/rtm).

Используется библиотека [Material design](https://getmdl.io/index.html)
