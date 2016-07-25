var pushLeft = document.getElementById('pushLeft');
var pushRight = document.getElementById('pushRight');
var pullLeft = document.getElementById('pullLeft');
var pullRight = document.getElementById('pullRight');

var ul = document.createElement('ul');

var array = [];
var input = document.getElementsByTagName('input')[0];
//初始化函数，然后再定义几个变量
function funcDelegation(event) {
  if (!input.value) {
    alert('please input number!')
    return false};
    switch(event.target)
  {
    case pushLeft:
      //alert("hello");
      array.unshift(input.value);
      addNumber(array);
      break;
    case pushRight:
      array.push(input.value);
      addNumber(array);
      break;
    case pullLeft:
      //
      break;
    case pullRight:
      //
      break;
  }
  event.stopPropagation();
}
function addNumber(array) {
  var content = '';
  for(i in array){
    content+='<li>'+array[i]+'</li>';
  };
  ul.innerHTML = content;
  document.body.appendChild(ul);
}
function init() {
  document.body.addEventListener('click',funcDelegation,false);
};
init();