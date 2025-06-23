chrome.contextMenus.create({
  id: "translate",
  title: "Translate with Google Translate",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;

  if (selectedText) {
    fetch(`https://translation.googleapis.com/language/translate/v2?key=API_KEY`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: selectedText,
        target: 'ko', // 원하는 언어로 변경
      })
    })
    .then(response => response.json())
    .then(data => {
      const translatedText = data.data.translations[0].translatedText;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: displayTranslation,
        args: [translatedText],
      });
    });
  }
});

function displayTranslation(translatedText) {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = '10px';
  div.style.top = '10px';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  div.style.color = 'white';
  div.style.padding = '10px';
  div.style.borderRadius = '5px';
  div.innerText = translatedText;

  document.body.appendChild(div);

  setTimeout(() => {
    document.body.removeChild(div);
  }, 5000);
}
