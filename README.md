
# Sus Api Telegram Bot Example Project

This is an example Telegram bot project built with the [https://sus-apis.onrender.com](https://sus-apis.onrender.com/) API. It demonstrates how to create a bot with various commands using Node.js, integrating external APIs for features like guessing games, music playback, and color generation.

## Built With

-   **API**: [https://sus-apis.onrender.com](https://sus-apis.onrender.com/) - Provides endpoints for random colors, country quizzes, and YouTube audio.
-   **Node.js**: Runtime environment.
-   **Telegram Bot API**: For bot functionality.
-   **Dependencies**: `axios`, `canvas`, `node-telegram-bot-api`, etc.

## Setup Instructions

1.  **Clone the Repository**:
    
    ```bash
    git clone https://github.com/1dev-hridoy/Sus-Apis.git
    cd Sus-Apis
    
    ```
    
2.  **Install Dependencies**:
    
    ```bash
    npm install
    
    ```
    
    -   Ensure `axios`, `canvas`, and `node-telegram-bot-api` are installed.
    -   For `canvas`, install system dependencies (e.g., `libcairo2-dev` on Ubuntu).
3.  **Configure Environment**:
### 🔄 Rename `example.env` to `.env`

First, **rename** your `example.env` file to `.env` in the root directory of your project.

    - Then, open the `.env` file and paste this:
        
        ```plaintext
        TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
        MONGODB_URI=MONGODB_URI
        
        ```
        
    -   Create a `config/settings.json` file:
        
        ```json
        {
          "botName": "SUS BOT",
          "ownerName": "Hridoy",
          "ownerUid": "1797686564",
          "admins": ["1797686564"],
          "botPrefix": "!",
          "botLanguage": "en"
        }
        
        ```
        
4.  **Run the Bot**:
    
    ```bash
    npm start
    
    ```
    
5.  **Test the Bot**:
    
    -   Add the bot to a Telegram group or chat.
    -   Use commands like `!help`, `!guess-country`, `!play`, or `!color`.

## Creating an Example Command

### Steps to Make a New Command

1.  **Create a Command File**:
    
    -   Add a new file in `scripts/commands/`, e.g., `example.js`.
2.  **Write the Command Code**:
    
    -   Example: A command to greet the user.
    
    ```javascript
    const User = require('../../models/User');
    
    module.exports = {
      name: "example",
      description: "Says hello to the user",
      category: "Fun",
      usePrefix: true,
      async execute(bot, msg) {
        const chatId = msg.chat.id;
        const userId = msg.from.id.toString();
        const messageId = msg.message_id;
    
        try {
          let user = await User.findOne({ telegramId: userId });
          if (!user) {
            user = new User({
              telegramId: userId,
              username: msg.from.username,
              firstName: msg.from.first_name,
              lastName: msg.from.last_name,
            });
          }
          await user.updateOne({ lastInteraction: new Date(), $inc: { commandCount: 1 } });
          await user.save();
    
          await bot.sendMessage(chatId, `Hello, ${msg.from.first_name}! 🎉`, {
            reply_to_message_id: messageId
          });
        } catch (err) {
          console.error('Example command error:', err.message);
          await bot.sendMessage(chatId, 'Something went wrong. Try again!', {
            reply_to_message_id: messageId
          });
        }
      }
    };
    
    ```
    
3.  **Test the Command**:
    
    -   Run `!example` in Telegram to see the greeting.

### Notes

-   Ensure the bot has proper permissions (e.g., send messages).
-   Update `README.md` with new commands as needed.

## Contributing

Feel free to fork and submit pull requests!

## License

MIT