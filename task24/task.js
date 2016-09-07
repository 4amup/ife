var result = [];//用于存放遍历的dom节点
var timer = null;//定义动画定时器
var tip = null;

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
  //为查找操作绑定时间
  document.getElementById("findit").onclick = function(){
    // init
    styleReset();
    clearInterval(timer);
    result = [];
    var tip = document.createElement('p');
    tip.setAttribute('class','tip');
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
  var count =0;
  var tip = document.createElement('p');
  tip.setAttribute('class','tip');
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

//样式初始化函数
function styleReset(){
  var divEles = document.getElementsByTagName("div");
  for(var i=0; i<divEles.length;i++){
    divEles[i].style.backgroundColor = '#fff';
  }

  var markDivs = document.getElementsByClassName('markdiv');
  if (markDivs.length) {
    for (var j = 0; j < markDivs.length; j++) {
      markDivs[j].removeAttribute('class');
    }
  }

  var tips = document.getElementsByClassName('tip');
  if (tips.length) {
    tips[0].parentNode.removeChild(tips[0]);
  }
}