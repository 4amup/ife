var result = [];//用于存放遍历的dom节点
var timer = null;//定义动画定时器

window.onload = function(){
  var rootNode = document.getElementById("wrapper");
  //为前序遍历按钮绑定事件
  document.getElementById("preOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    preOrder(rootNode);
    startAnimate();
  }
  //为中序遍历按钮绑定事件
  document.getElementById("inOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    inOrder(rootNode);
    startAnimate();
  }
  //为后序遍历按钮绑定事件
  document.getElementById("postOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    postOrder(rootNode);
    startAnimate();
  }
}
/*
*使用递归的方式前序遍历DOM
*/

function preOrder(node){
  result.push(node);
  if(node.firstElementChild !== null){
    preOrder(node.firstElementChild);
  }
  if(node.lastElementChild !== null){
    preOrder(node.lastElementChild);
  }
}
/*
*使用递归的方式中序遍历DOM
*/

function inOrder(node){
  if(node.firstElementChild !== null){
    inOrder(node.firstElementChild);
  }
  result.push(node);
  if(node.lastElementChild !== null){
    inOrder(node.lastElementChild);
  }
}
/*
*使用递归的方式后续遍历DOM
*/

function postOrder(node){
  if(node.firstElementChild !== null){
    postOrder(node.firstElementChild);
  }
  if(node.lastElementChild !== null){
    postOrder(node.lastElementChild);
  }
  result.push(node);
}
//动画开启函数，每隔一秒
function startAnimate(){
  var i = 0;
  result[i].style.backgroundColor = 'blue';
  timer = setInterval(function(){
    i++;
    if(i < result.length){
      result[i-1].style.backgroundColor = '#fff';
      result[i].style.backgroundColor = 'blue';
    }else{
      clearInterval(timer);
      result[result.length-1].style.backgroundColor = '#fff';
    }
  }, 1000)
}
//样式初始化函数
function styleReset(){
  var divEles = document.getElementsByTagName("div");
  for(var i=0; i<divEles.length;i++){
    divEles[i].style.backgroundColor = '#fff';
  }
}