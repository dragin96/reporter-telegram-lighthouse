# Телеграмм отчет для lighthouse
Используется для парсинга assert и создает отчет если пороговые значения не совпадают 
модуль написан на nodejs. Для использывания достаточно указать ид чата и токен бота
## Установка и запуск
### Глобально
```bash
npm i reporter-telegram-lighthouse  -g
```

### Запуск
```bash
reporter-telegram-lighthouse  --token-bot token --id-chat id_chat_teleggram
```

### Запуск с использыванием npx 
Запуск без глобальной установки
```bash
npx reporter-telegram-lighthouse  --token-bot token --id-chat id_chat_teleggram
```

### Example
```bash
reporter-telegram-lighthouse  --token-bot 1170224844:AAELpniTXBOYQH23S74duhhYXcSQdS4Cv4E --id-chat -391265339
```
