// 初始化一些公共变量
var tip = document.getElementById("tip");
var input = document.getElementById("input");
var match = document.getElementById("match");

// 公共数组
var arr = new Array();

function render(array){
  var showIt = document.getElementById("show");
  function addToShowIt(item) {
    var child = document.createElement("div");
    child.innerHTML = item;
    showIt.appendChild(child);
  }
  array.map(addToShowIt);
}

function addContent() {
  console.log("add");
  var content = document.getElementById("content").value;
  // 这里的split返回一个数组，splice就是简单的分开而已
  // split参数可以传递正则表达式
  arr = content.split(/[\n\,\，\、\s\t]+/);
  // 丢弃末尾的空值
  if (arr[arr.length-1]=="") {
    arr.pop();
  }

  render(arr);
  console.log(arr);
}

function matchContent() {
  console.log("match");
  var matchValue = document.getElementById("match-value").value;
  if (matchValue) {
    tip.innerHTML = "";

  } else {
    tip.innerHTML = "tip:"+"请您输入需匹配的值后再操作";
  }
  console.log(matchValue);  
}

function init() {
  input.addEventListener("click",addContent);
  match.addEventListener("click",matchContent);
}
init();