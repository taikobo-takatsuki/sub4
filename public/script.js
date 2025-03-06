document.addEventListener('DOMContentLoaded', () => {
  const sourceTextArea = document.getElementById('sourceText');
  const translateBtn = document.getElementById('translateBtn');
  const translationResult = document.getElementById('translationResult');
  const loadingIndicator = document.getElementById('loading');

  translateBtn.addEventListener('click', async () => {
    const text = sourceTextArea.value.trim();
    
    if (!text) {
      alert('翻訳するテキストを入力してください。');
      return;
    }

    // UI更新
    translateBtn.disabled = true;
    loadingIndicator.style.display = 'block';
    translationResult.textContent = '';

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // レスポンスを整形して表示
        const formattedResult = formatTranslationResult(data.result);
        translationResult.innerHTML = formattedResult;
      } else {
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

  // 翻訳結果を整形する関数
  function formatTranslationResult(result) {
    // DeepSeek AIからの応答を整形
    // 応答形式によって調整が必要かもしれません
    return result
      .replace(/\n/g, '<br>')
      .replace(/【(.+?)】/g, '<strong>【$1】</strong>');
  }

  // Enterキーで翻訳実行
  sourceTextArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      translateBtn.click();
    }
  });
}); 