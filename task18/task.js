

var pushLeft = document.getElementById('pushLeft');
var pushRight = document.getElementById('pushRight');
var pullLeft = document.getElementById('pullLeft');
var pullRight = document.getElementById('pullRight');
var ul = document.createElement('ul');
var array = [];
var input = document.getElementsByTagName('input')[0];
//代理button的点击事件
function funcDelegation(event) {
    switch(event.target)
  {
    case pushLeft:
      if (input.value) {
        array.unshift(input.value);
        addNumber(array);
      }else{
        alert("请输入1-100数字！");
      };
      break;
    case pushRight:
      if (input.value) {
        array.push(input.value);
        addNumber(array);
      } else {
        alert("请输入1-100数字！");
      };
      break;
    case pullLeft:
      if (array.length) {
        alert(array.shift());
        addNumber(array);
      } else {
        alert("当前数组为空，请输入数字后再执行删除操作！");
      };
      break;
    case pullRight:
      if (array.length) {
        alert(array.pop());
        addNumber(array);
      } else {
        alert("当前数组为空，请输入数字后再执行删除操作！");
      };
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