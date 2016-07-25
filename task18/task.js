var pushLeft = document.getElementById('pushLeft');
var pushRight = document.getElementById('pushRight');
var pullLeft = document.getElementById('pullLeft');
var pullRight = document.getElementById('pullRight');
var array = [1,5,9];
//初始化函数，然后再定义几个变量
function funcDelegation(event) {
  if (event.target.nodeName == 'BUTTON') {
    // alert("hello");
  }
  switch(event.target)
  {
    case pushLeft:
      //alert("hello");
      addNumber(array);
      break;
    case pushRight:
      //
      break;
    case pullLeft:
      //
      break;
    case pullRight:
      //
      break;
  }
}
function addNumber(array) {
  var ul = document.createElement('ul');
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