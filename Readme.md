# Требования


Нужно написать сервис на тайпскрипте, который умеет слушать события гитхаба и создавать сообщение в 
нашем сервисе с содержанием события.
Для начала требутеся создавать содержательные сообщения на 2 любых события. 
В остальных случаях писать, например "произошло неизвестное событие".

Сервис нужно разместить в одном из облачных хостингов на усмотрение разработчика (heroku, 
yandex cloud functions, aws lambda)

Документацию по api нашего сервиса можно найти тут: https://api-dev.ppl.do/docs/

Для разработки следует использовать dev окружение.

Для аутентификации бота следует использовать токен обычного юзера (токен валиден 2 недели, на время
разработки должно хватить).

+162055501хх - пул тестовых номеров для нашего дев-окружения. https://dev.ppl.do


## Уточненные требования


Если сервис ppl.do недоступен или вернул ошибку: Будет достаточно просто игнорить это событие. 
Но, если сделаешь механизм переотправки в случае отказа сервиса, будет хорошо.

Возможно размещение сервиса на VPS  с Linux.

Требуется зарегистрировать аккаунт руками (через api или через форму, вытащив токен из cookies). 
Затем создать чат с (определенным конкретным пользователем). 
И используя токен слать сообщения в этот чат.

Для отправки сообщения понадобится мутация newMessages2


Если пользователь вышел из чата , чат автоматически завершается - этот кейс учитывать не нужно.

ID чата можно получить из query { chats... } или из адресной строки при выборе соответствующего чата.




## Дополнительные требования, предположения и ограничения


Поскольку конкретных критериев приемки/оценки не было представлено, я исхожу из следующих предпосылок.
Так как это тестовое задание , поэтому основным критерием является работающий и протестированный код, 
соответствующий требованиям.
Необходимо продемонстрировать умение писать работающий код в соответствии с лучшими практиками и принципами, 
документировать его, умение проанализировать и понять требования, произвести исследования и выбрать подходящие
платформы и компоненты, разобраться в новых для себя API, задокументировать технические решения, 
ограничения и пути дальнейшего усовершенствования.
Также я для себя установил ограничение не более 16 часов в сумме на всю работу по этому заданию.




# Конфигурация


## Шаг1:
Перейдите в ваш GitHub репозиторий и выберите Настройки (Settings)
Выберите Add webhook в меню Webhooks.
Введите ваш webhook url, по которому сконфигурирован github controller (полностью строчку url с http://.... и номер порта если не стандартный)
Укажите секртеный ключ (Secret)
Выберите Content-Type Application/Json
Выберите все события ( Send me everything. ).



## Шаг2: 
В корне папки с билдом создайте файл .env с таким содержимым

    PORT=3001                                            #порт который будет слушать сервер (для получения webhook соединений)
    HOST=127.0.0.1                                       #адрес который будет слушать сервер (можно не указывать этот параметр)
    PPLDO_CHAT_ID=f555.....                              #чат ID куда посылать сообщения
    PPLDO_API_URL=https://api-dev.ppl.do/graphql         #url для конекции graphql клиента
    LOCALE=ru                                            #локаль для форматирования дат
    PPLDO_API_TOKEN=dda7.....                            #токен для API Graphql



# Описание архитектуры.

Сервер состоит из двух логических компонент: модуль для интерфейса с Github и модуль для интерфейса с сервисом PeopleDo.
Оба модуля не содержат взаимных зависимостей и общаются между собой через Notification Service, который выполняет роль
внутреннего message broker. 
Модуль Github состоит из GithubController, который обрабатывает HTTP POST запросы от Github, и GithubService, который
отвечает за разбор данных и формирование строки описания события.
Модуль PeopleDo состоит из PplDoService который подписывается на события Notification Service и при получении событий
передает строку сообщения PplDoController, который формирует GraphQL мутацию по схеме NewMessages2 и выполняет GraphQL запрос
на PplDo API сервер.


## Описание потока данных
1. При выполнении пользователем действий над репозиторием (push, создание или закрытие issue, и т п)
github автоматически посылает HTTP POSt запрос на указанный в настройках репозитория url для webhook (см шаг1)
   Данные о событии посылаются в виде json объекта
 
   
2. при получении запроса Express перенаправляет его на Gihub controller, а тот в свою очередь передает данные из
его body в GithubService
   На данный момент мы принимаем все события, но распознаем только push, open issue, close issue.
   Все остальные события будут отображаться как Unknown Event

3. GithubService разбирает объект запроса, определяет какое именно было событие (push, issue opened, issue closed)
и формирует по шаблону строку сообщения о событии.
   На данный момент мы принимаем все события, но распознаем только push, open issue, close issue.
   Все остальные события будут отображаться как Unknown Event
   Я не искал спецификацию формата запроса webhook от Github, а просто смотрел какие данные приходят при разных
   действиях в репозитории. Поэтому для определения типа события использую следующий алгоритм. 
   Если запрос содержит поле pusher, то считается, что это событие push. Если запрос содержит
   поле issue, то это событие с issue, и тогда смотрим на поле action и понимаем что именно произошло (opened, closed , и тп).
   Алгоритм извлекает из запроса поля , которые содержат полезную информацию о событии.
   В частности, для события push извлекаются : дата/время, репозиторий, имя пользователя который произвел push, а также 
   список коммитов которые вошли в этот push. Для каждого коммита выводится: имя пользователя, дата/время, и 
   коментарий к коммиту. 
   Для событий , связанных с issue: дата/время, действие, репозиторий, имя пользователя который действие, а также
   заголовок issue.
   Для остальных событий : репозиторий, имя пользователя (если есть) и дата/время (если есть).
   
4. Сформированная по шаблону строка далее отправляется внутренним событием "GITHUB_EVENT" в NotificationService, который
служит брокером для развязывания зависимостей между модулями.

5. PplDoService подписан на все события ("*") и при получении события передает строчку в PplDoController.

6. PplDoController подготавливает по схеме GraphQL мутацию NewMessages2 , в которую добавляет строчку сообщения и 
   выполняет GraphQL запрос на API PPlDo.  
   Результат запроса и/или ошибки в данный момент никак не обрабатываются, а просто выводятся в лог.
   При возникновении ошибок повтор отправки не производится.
   GraphQL схема скачана с сервера в виде файла и добавлена в проект . На ее основе сгенерированы Typescript типы
   при помощи graphql-codegen.




# Сборка

Для сборки добавлен скрипт в package.json.
Запуск сборки:

npm run build


# Тестирование

Для модульного тестирования реализованы mock тестовые классы для PplDoController, GithubController.
Тестирование производится путем имитации сообщения от github и передачи его сразу на вход TestGithubController, который
в свою очередь передает его в сервис. Прогоняется вся цепочка Github - событие - подписчики - PplDoService - TestPplDoController.
TestPplDoController подготавливает graphQl запрос, но не отсылает его, а все его параметры сохраняет в  TestStorage.
Класс TestApp для подготовки тестирования, загрузки тестовых данных из test-fixtures, запуска тестов,
сверки результата каждого теста с expected значением. 

Если параметры graphQL запроса совпадают с expected , то тест выводит PASSED, иначе - выводит FAIL и детали того,
что именно не совпало.
Можно запускать серию тестов (после каждого нужно очищать TestStorage).

Для запуска теста выполните npm run test



# Деплоймент


Сервис развернут на арендованом Linux VPS, принимает http запросы на url http://194.87.215.62:3001/github/event
Для его запуска используется консольная команда ts-node ./src/app.ts, либо node ./dist/app.js
Отладочные сообщения, логи и ошибки выводятся в консоль.
Если сервер перегрузить или закрыть консоль, то он останавливается (запуск как демон не реализован).
Выкатывание на сервер производится вручную путем копирования папки по scp.



# Список недостатков/возможностей для улучшения:


* TODO Автоматизировать загрузку билда на сервер
* TODO реализовать автозапуск в режиме демона (например через pm2) и вывод логов в файлы
* TODO настроить nginx reverse proxy для https
* TODO Можно реализовать обработку других типов событий от github, поисследовать использование API Github Actions
  вместо Webhooks 
* TODO PPldoController: реализовать надежную доставку сообщений (с конфигурированием количества попыток и интервала между ними)
* TODO поисследовать другие GraphQL клиенты, например Apollo.
* TODO можно улучшить систему логирования ошибок и рассылать уведомления например на email при критических ошибках
* TODO сейчас GRAPHQL схема вручную добавлена в проект и сам mutation сформирован в виде gql строки.
       Поисследовать возможно ли автоматический импорт схемы , кодогенерация
* TODO сейчас ID чата необходимо вручную указывать в .env файле. Как дальнейшее развитие можно сделать , чтобы
  при старте сервер автоматически создавал чат через API
* TODO сейчас аутентификация клиента происходит по токену, который нужно вручную указывать в .env файле.
  Как дальнейшее развитие можно сделать , чтобы  при старте сервер автоматически логинился в PPlDoc и получал
  токен
* TODO c точки зрения безопасности рекомендуется ограничить входящие HTTP соединения только соединениями от Github,
     либо путем ACL по IP адресам, либо проверкой аутентификации. Также следует ограничить количество соединений в 
     секунду.
* TODO для модульного тестирования использовать один из стандартных js фреймворков, интегрировать его в CI/CD
     цепочку для получения уведомлений о падении теста
* TODO разобраться как задеплоить сервис в облако yandex и AWS
  
  