//全局变量区块
var result = [];//用于存放遍历的dom节点
var timer = null;//定义动画定时器
//提示内容
var tip = document.createElement('p');
tip.setAttribute('class','tip');
// 共享数据存放
var rootNode = document.getElementById("wrapper");
var selectdiv = null;

window.onload = function(){
  // 为点选节点绑定事件
  document.body.addEventListener('click',function(event){
    if (event.target.tagName == "DIV") {
      // 环境初始化
      styleReset();
      clearInterval(timer);
      result = [];
      // 为点选的div设定样式
      selectdiv = event.target;
      selectdiv.setAttribute('class','selectdiv');
    }
  });
  // 为删除按钮绑定事件
  document.getElementById('delit').onclick = function(){
    // env init
    styleReset();
    clearInterval(timer);
    result = [];
    // checker
    if (!selectdiv) {
      tip.innerHTML = "Tip:未选定节点！";
      document.body.appendChild(tip);
      return false;
    }
    selectdiv.parentNode.removeChild(selectdiv);
    selectdiv = null;
  };
  // 为增加按钮绑定事件
  document.getElementById('pushit').onclick = function(){
    // env init
    styleReset();
    clearInterval(timer);
    result = [];
    // checker
    if (!selectdiv) {
      tip.innerHTML = "Tip:未选定节点！";
      document.body.appendChild(tip);
      return false;
    }
    var addcontent = document.getElementById('addcontent').value;
    if (!addcontent) {
      tip.innerHTML = "Tip:请输入需要插入节点的内容！";
      document.body.appendChild(tip);
      return false;
    }
    // 正式函数体
    var insertChild = document.createElement('div');
    insertChild.textContent = addcontent;
    selectdiv.appendChild(insertChild);
    selectdiv = null;
  }
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
  //为查找操作绑定事件
  document.getElementById("findit").onclick = function(){
    // init
    styleReset();
    clearInterval(timer);
    result = [];
    // 前序遍历后得到result数组
    postOrder(rootNode);
    // get value后和数组进行比较
    var value = document.getElementById("inputit").value;
    if (!value) {
      tip.innerHTML = "Tip:请输入查找词！";
      document.body.appendChild(tip);
      return false;
    }
    findAnimate(value);
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
  if(node.nextElementSibling !== null && node.nextElementSibling.tagName == 'DIV'){
    preOrder(node.nextElementSibling);
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
  if(node.nextElementSibling !== null && node.nextElementSibling.tagName == 'DIV'){
    inOrder(node.nextElementSibling);
  }
}
/*
*使用递归的方式后续遍历DOM
*/

function postOrder(node){
  if(node.firstElementChild !== null){
    postOrder(node.firstElementChild);
  }
  if(node.nextElementSibling !== null && node.nextElementSibling.tagName == 'DIV'){
    postOrder(node.nextElementSibling);
  }
  result.push(node);
}
//动画开启函数，每隔half秒
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
  }, 500)
}
//查找动画
function findAnimate(value){
  var i = 0;
  var count =0;//为查找到的计数

  if(result[i].firstChild.textContent.trim().toLowerCase() == value.trim().toLowerCase()){
    result[i].setAttribute('class','markdiv');
    count++;
  };

  result[i].style.backgroundColor = 'blue';

  timer = setInterval(function(){
    i++;
    if(i < result.length){
      if(result[i].firstChild.textContent.trim().toLowerCase() == value.trim().toLowerCase()){
        result[i].setAttribute('class','markdiv');
        count++;
      };
      result[i-1].style.backgroundColor = '#fff';
      result[i].style.backgroundColor = 'blue';
    }else{
      clearInterval(timer);
      result[result.length-1].style.backgroundColor = '#fff';

      if (count) {
        tip.innerHTML = "Tip:找到了"+count+"个匹配节点。";
      }else{
        tip.innerHTML = "Tip:找不到您要查询的内容！";
      }
      document.body.appendChild(tip);
    }
  }, 500);
}

//样式初始化函数集合
function clearBgColor() {
  var divEles = document.getElementsByTagName("div");
  for(var i=0; i<divEles.length;i++){
    divEles[i].style.backgroundColor = '#fff';
  }
}
function clearMark() {
  var markDivs = document.getElementsByClassName('markdiv');
  if (markDivs.length) {
    for (var j = 0; j < markDivs.length; j++) {
      markDivs[j].removeAttribute('class');
    }
  }
}
function clearTip() {
  var tips = document.getElementsByClassName('tip');
  if (tips.length) {
    tips[0].parentNode.removeChild(tips[0]);
  }
}
function clearSelected(){
  var selected = document.getElementsByClassName('selectdiv');
  if (selected.length) {
    selected[0].removeAttribute('class');
  }
}
// 总清理函数
function styleReset(){
  clearBgColor();
  clearMark();
  clearSelected();
  clearTip();
}