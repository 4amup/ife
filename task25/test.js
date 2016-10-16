console.log('test.js');

rootNode.addEventListener('click', function(e) {
  if(e.target && e.target.nodeName == 'BUTTON') {
    e.target.nextElementSibling.style.display = 'none';
  }
})
