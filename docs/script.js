document.addEventListener('DOMContentLoaded', () => {
  const sourceTextArea = document.getElementById('sourceText');
  const translateBtn = document.getElementById('translateBtn');
  const translationResult = document.getElementById('translationResult');
  const loadingIndicator = document.getElementById('loading');
  const resultContainer = document.querySelector('.result-container');

  // ページ読み込み時にテキストエリアにフォーカス
  sourceTextArea.focus();

  // 結果コンテナを非表示にする（最初は結果がないため）
  resultContainer.style.display = 'none';

  translateBtn.addEventListener('click', async () => {
    const text = sourceTextArea.value.trim();
    
    if (!text) {
      showNotification('翻訳するテキストを入力してください。');
      sourceTextArea.focus();
      return;
    }

    // UI更新
    translateBtn.disabled = true;
    loadingIndicator.style.display = 'block';
    translationResult.textContent = '';

    try {
      // GitHub Pagesでは実際のAPIを呼び出せないため、ダミーの応答を使用
      // 実際のAPIを使用する場合は、この部分を元に戻す
      /* 
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      */
      
      // デモ用ダミーレスポンス（実際のAPIが使えない場合用）
      await new Promise(resolve => setTimeout(resolve, 1500)); // 翻訳中の演出
      
      const dummyResponse = {
        ok: true,
        json: () => Promise.resolve({
          result: mockTranslation(text)
        })
      };
      
      const data = await dummyResponse.json();
      
      if (dummyResponse.ok) {
        // 結果コンテナを表示
        resultContainer.style.display = 'block';
        
        // スムーズにスクロール
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // レスポンスを整形して表示
        const formattedResult = formatTranslationResult(data.result);
        translationResult.innerHTML = formattedResult;
        
        // 成功通知を表示
        showNotification('翻訳が完了しました！', 'success');
      } else {
        showNotification(`エラー: ${data.error || '翻訳中にエラーが発生しました。'}`, 'error');
        throw new Error(data.error || '翻訳中にエラーが発生しました。');
      }
    } catch (error) {
      console.error('翻訳エラー:', error);
      translationResult.textContent = `エラー: ${error.message}`;
    } finally {
      // UI元に戻す
      translateBtn.disabled = false;
      loadingIndicator.style.display = 'none';
    }
  });

  // モックの翻訳関数 (GitHubページでのデモ用)
  function mockTranslation(text) {
    const translations = {
      'hello': '【翻訳】こんにちは\n【発音】コンニチワ',
      'good morning': '【翻訳】おはようございます\n【発音】オハヨウゴザイマス',
      'thank you': '【翻訳】ありがとうございます\n【発音】アリガトウゴザイマス',
      'how are you': '【翻訳】お元気ですか\n【発音】オゲンキデスカ',
      'i love japan': '【翻訳】私は日本が大好きです\n【発音】ワタシワニホンガダイスキデス',
      'what is your name': '【翻訳】あなたの名前は何ですか\n【発音】アナタノナマエワナンデスカ',
      'nice to meet you': '【翻訳】はじめまして\n【発音】ハジメマシテ',
      'where is the station': '【翻訳】駅はどこですか\n【発音】エキワドコデスカ',
      'this is delicious': '【翻訳】これはおいしいです\n【発音】コレワオイシイデス',
      'goodbye': '【翻訳】さようなら\n【発音】サヨウナラ'
    };

    // 入力テキストに一致するものがあれば返す
    for (const [key, value] of Object.entries(translations)) {
      if (text.toLowerCase().includes(key)) {
        return value;
      }
    }

    // 一致するものがなければデフォルトの応答
    return `【翻訳】${text}の日本語訳\n【発音】カタカナ発音例\n\n※GitHubページでのデモ表示のため、実際の翻訳結果ではありません。`;
  }

  // 翻訳結果を整形する関数
  function formatTranslationResult(result) {
    // DeepSeek AIからの応答を整形
    return result
      .replace(/\n/g, '<br>')
      .replace(/【(.+?)】/g, '<strong style="color: #6c5ce7;">【$1】</strong>')
      .replace(/（(.+?)）/g, '<span style="color: #636e72;">（$1）</span>');
  }

  // 通知を表示する関数
  function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    document.body.appendChild(notification);

    // スタイルを適用
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: type === 'success' ? '#6c5ce7' : type === 'error' ? '#e74c3c' : '#3498db',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '80%',
      animation: 'slideIn 0.3s forwards'
    });

    // CSSアニメーションを追加
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // 3秒後に通知を非表示
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Enterキーで翻訳実行 (Ctrlキーとの組み合わせ)
  sourceTextArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      translateBtn.click();
    }
  });
}); 