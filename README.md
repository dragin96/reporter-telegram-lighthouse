# Telegram report for lighthouse
Used to parse assert and generate a report if threshold values do not match.
The module is written in nodejs. To use it is enough to specify the chat id and bot token
## Install and run
### Global install
```bash
npm i reporter-telegram-lighthouse  -g
```

### Run
```bash
reporter-telegram-lighthouse  --token-bot token --id-chat id_chat_teleggram
```

### Run whit npx
Does not require global installation
```bash
npx reporter-telegram-lighthouse  --token-bot token --id-chat id_chat_teleggram
```

### Example
```bash
reporter-telegram-lighthouse  --token-bot 1170224844:AAELpniTXBOYQH23S74duhhYXcSQdS4Cv4E --id-chat -391265339
```
