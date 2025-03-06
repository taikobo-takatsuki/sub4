const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

// 環境変数のロード
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSONとURLエンコードされたボディのパース
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// DeepSeek APIを使用して翻訳
async function translateText(text, targetLang = 'Japanese') {
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `あなたは翻訳エキスパートです。入力された言語を日本語に翻訳し、その結果と発音をカタカナで回答してください。`
          },
          {
            role: 'user',
            content: `この文章を日本語に翻訳し、日本語の発音もカタカナで教えてください: "${text}"`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('翻訳エラー:', error.response?.data || error.message);
    throw new Error('翻訳処理中にエラーが発生しました');
  }
}

// 翻訳APIエンドポイント
app.post('/api/translate', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'テキストが提供されていません' });
    }

    const result = await translateText(text);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
}); 