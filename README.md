# DeepSeek 翻訳アプリ

DeepSeek AIを使用して、外国語を日本語に翻訳し、その発音をカタカナで表示するアプリケーションです。

[デモサイトを表示](https://taikobo-takatsuki.github.io/sub4/)

## 機能

- 任意の外国語テキストを入力
- DeepSeek AIによる高品質な日本語翻訳
- 翻訳された日本語のカタカナ発音表示

## 開発環境のインストール方法

```bash
# リポジトリをクローン
git clone https://github.com/taikobo-takatsuki/sub4.git
cd sub4/translation-app

# 依存関係のインストール
npm install
```

## 環境変数の設定

`.env`ファイルを作成し、DeepSeek APIキーを設定します：

```
DEEPSEEK_API_KEY=your_api_key_here
```

※DeepSeek APIキーは[DeepSeek AI公式サイト](https://platform.deepseek.com/)から取得できます。

## 開発環境での実行方法

```bash
# アプリケーションを起動
npm start
```

ブラウザで http://localhost:3000 にアクセスして利用できます。

## GitHub Pagesでのデプロイ方法

1. docsディレクトリを作成し、必要なファイルをコピー
2. リポジトリの Settings -> Pages で、Source を "main branch /docs folder" に設定
3. Save ボタンをクリックしてデプロイを開始

デモサイトはAPIを実際に呼び出すことができないため、ダミーのレスポンスを使用しています。
実際の環境では、バックエンドのAPIが必要です。

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