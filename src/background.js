chrome.contextMenus.create({
  id: "translate",
  title: "Translate with Google Translate",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;

  if (selectedText) {
    fetch('https://api.deepl.com/v2/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'DeepL-Auth-Key YOUR_AUTH_KEY', // 실제 키 입력
  },
  body: JSON.stringify({
    text: [selectedText],
    target_lang: 'KO' 
  })
})
  .then(response => response.json())
  .then(data => {
    const translatedText = data.translations[0].text;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: displayTranslation,
      args: [translatedText],
    });
  })
  .catch(error => console.error('Translation failed:', error));
  }
});

function displayTranslation(translatedText) {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = '10px';
  div.style.top = '10px';
  div.style.backgroundColor = 'while';
  div.style.color = 'black';
  div.style.padding = '10px';
  div.style.borderRadius = '5px';
  div.innerText = translatedText;

  document.body.appendChild(div);

  setTimeout(() => {
    document.body.removeChild(div);
  }, 3000);
}
