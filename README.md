# main template next.js

После отправки формы регистрации, если данный пользователь существует, на странице регистрации, должно появиться сообщение и произойте редирект на /логин или на туже /регистр
те в компоненте страница, у нас есть контроль ошибок
опять туплю

## Ошибки будем обрабатывать на клиенте, тк не понятно как данные об ошибке отправлять клиенту. По коду ошибки будем создовать сообщение об ошибке на клиенте

!! Стратегия добавлена, делам обработку формы и работу с ответом на вход. login page и login form

есть вопросы по стратегии, есть смысл перейти на jwt
local-token

#

Здесь идет перенаправление на /, но чтение сервера не происходит поэтому приложение ничего не знает об успешном входе юзера.

1. Сделать роут на сервере, которого нет на клиенте, роут будет делать редирект на корень /. Полученный req.user сохраняем в контексте, при запросах ничего не отправляем, только маршруты будут проверять время жизни сессии, и в случае захода на секретную страницу, на страницу мы войдем, тк юзер сохраненн в контексте, а данные не придут.
2. Отказаться от сессии, выбрать паспорт + jwt. Сохранить токен в куках в момент ответа на отправку логин данных, привязать к каждому запросу и проверять время жизни токена.

3. Logout спан элемент при клике на который идет событие онклик, метод приходит через контекст или через пропсы из \_app компонента

4. Ебучие рога, если делаем логоут с главной страницы header приложения не обновляется
