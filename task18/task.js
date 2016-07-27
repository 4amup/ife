

var pushLeft = document.getElementById('pushLeft');
var pushRight = document.getElementById('pushRight');
var pullLeft = document.getElementById('pullLeft');
var pullRight = document.getElementById('pullRight');
var ul = document.createElement('ul');
var array = [];
var input = document.getElementsByTagName('input')[0];
function test() {
  if(!input.value) {
    alert('please input a number!');
  };
  return false;
}
//代理button的点击事件
function funcDelegation(event) {
    switch(event.target)
  {
    case pushLeft:
      test();
      array.unshift(input.value);
      addNumber(array);
      break;
    case pushRight:
      test();
      array.push(input.value);
      addNumber(array);
      break;
    case pullLeft:
      test();
      var item = array.shift();
      addNumber(array);
      alert(item);
      break;
    case pullRight:
      test();
      var item = array.pop();
      addNumber(array);
      alert(item);
      break;
  }
}
//代理标签的删除事件
function numberDelegation(event) {
  if (event.target.tagName == "LI") {
    event.target.parentNode.removeChild(event.target);
  }
}
function addNumber(array) {
  var content = '';
  for(i in array){
    content+='<li id="number'+i+'">'+array[i]+'</li>';
  };
  ul.innerHTML = content;
  return document.body.appendChild(ul);
}
function init() {
  document.body.addEventListener('click',funcDelegation,false);
  document.body.addEventListener('click',numberDelegation,false);
};
init();