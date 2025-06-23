document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString();

  // 텍스트가 비어있지 않고 특수문자가 포함되어 있지 않으면 번역
  if (selectedText && !containsSpecialChars(selectedText)) {
    chrome.runtime.sendMessage({ text: selectedText });
  }
});

// 특수문자 포함 여부를 체크하는 함수
function containsSpecialChars(str) {
  // 특수문자 패턴 정의
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  
  return specialCharPattern.test(str);
}
