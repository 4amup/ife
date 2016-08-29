// 初始化一些公共变量
var tip = document.getElementById("tip");
var tips = ["请输入内容后再点击按钮","含有非法字符，请修改后重新输入","请您输入需匹配的值后再操作"]
var input = document.getElementById("input");
var match = document.getElementById("match");
var showIt = document.getElementById("show");

// 公共数组
var arr = new Array();
// check函数
function check(item){
  if (!item) {
    tip.innerHTML = "tips:"+tips[0];
    return false;
  } else if(item.search(/[^0-9a-zA-Z\u4e00-\u9fa5]/) != -1){
    tip.innerHTML = "tips:"+tips[1];
    return false;
  } else{
    console.log("continue");
  }  
}
// 渲染函数
function render(array){
  function addToShowIt(item) {
    var child = document.createElement("div");
    child.innerHTML = item;
    showIt.appendChild(child);
  }
  array.map(addToShowIt);
}
// 标记函数
function mark(re) {
  var reg = new RegExp(re,"g");
  for(var i=0;i<showIt.childNodes.length;i++) {
  var content = showIt.childNodes[i].textContent.replace(reg,"<mark>"+re+"</mark>");
  showIt.childNodes[i].innerHTML = content;
  }
}

function addContent() {

  var content = document.getElementById("content").value;
  tip.innerHTML = "";

  if (!content) {
    tip.innerHTML = "tips:"+tips[0];
    return false;
  }
  // 这里的split返回一个数组，splice就是简单的分开而已
  // split参数可以传递正则表达式
  arr = content.split(/[\n\,\，\、\s\t]+/);
  // 丢弃末尾的空值
  if (arr[arr.length-1]=="") {
    arr.pop();
  }
  // 检查数组的每个对象是否符合题目要求
  arr.map(check);
  // 渲染数组
  render(arr);
}

function matchContent() {
  // 将提示置为空
  tip.innerHTML = "";
  if (!showIt.childNodes.length) {
    tip.innerHTML = "tips:"+tips[0];
    return false;
  }
  var matchValue = document.getElementById("match-value").value;

  check(matchValue);
  
  mark(matchValue);
}

function init() {
  input.addEventListener("click",addContent);
  match.addEventListener("click",matchContent);
}
init();