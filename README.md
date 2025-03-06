# DeepSeek 翻訳アプリ

DeepSeek AIを使用して、外国語を日本語に翻訳し、その発音をカタカナで表示するアプリケーションです。

## 機能

- 任意の外国語テキストを入力
- DeepSeek AIによる高品質な日本語翻訳
- 翻訳された日本語のカタカナ発音表示

## インストール方法

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/translation-app.git
cd translation-app

# 依存関係のインストール
npm install
```

## 環境変数の設定

`.env`ファイルを作成し、DeepSeek APIキーを設定します：

```
DEEPSEEK_API_KEY=your_api_key_here
```

※DeepSeek APIキーは[DeepSeek AI公式サイト](https://platform.deepseek.com/)から取得できます。

## 使用方法

```bash
# アプリケーションを起動
npm start
```

ブラウザで http://localhost:3000 にアクセスして利用できます。

## 技術スタック

- Node.js
- Express.js
- DeepSeek AI API
- HTML5/CSS3/JavaScript

## ライセンス

MIT

## 注意事項

- DeepSeek APIの利用には、利用制限や料金が発生する場合があります。公式ドキュメントを参照してください。
- 翻訳結果の品質は、DeepSeek AIモデルに依存します。
- 本アプリケーションは個人的な目的での使用を想定しています。商用利用の場合は、APIの利用規約を確認してください。 