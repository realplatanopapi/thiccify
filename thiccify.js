function findThick (str) {
  return str.match(/thick/ig)
}

function thiccify(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    var newText = node.textContent.slice()
    var thick = findThick(newText)
    while (thick) {
      var minCs = 2
      var maxCs = 6
      var numCs = Math.floor(Math.random() * (maxCs - minCs) + minCs)
      var isSlimThicc = Math.random() < 0.3
      newText = newText.replace('thick', (isSlimThicc ? 'slim ' : '') + 'thi' + 'c'.repeat(numCs))
      thick = findThick(newText)
    }
    node.textContent = newText
  } else {
    Array.from(node.childNodes).forEach(thiccify)
  }
}

var observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        var newNode = mutation.addedNodes[i];
        thiccify(newNode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

thiccify(document.body)
