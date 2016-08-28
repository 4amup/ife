// 初始化一些公共变量
var tags = document.getElementById("tags");
var showtags = document.getElementsByClassName("show")[0];
var arr = new Array();

// 公共数组
var arr = new Array();

// 渲染函数
function render(array,parent){
  if (!array) {
    return false;
  }
  parent.innerHTML = "";
  array.forEach(function(item){
    var child = document.createElement("div");
    child.innerHTML = item;
    parent.appendChild(child);
  })
  
}
// 功能函数一
function addTags() {
  if (event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 188) {
    console.log(event.keyCode+"按了回车键空格键或逗号");
    // 处理字符串 先去掉两端的空格 再替换掉逗号或其他
    var result = tags.value.trim().replace(/[\s\r\n\,\，]/g,"");
    // 检查输入值是否重复或为空值
    if(arr.toString().indexOf(result)>-1){
      console.log("重复");
      tags.value=null;
      return false;
    }
    // 把符合条件的结果的值推入数组
    arr.push(result);
    // 检查数组长度，超过10，自动把第一个删掉
    if (arr.length>10) {
      tags.value=null;
      arr.shift(arr[0]);
      return render(arr,showtags);
    }
    render(arr,showtags);
    tags.value=null;
  }
}

function init() {
  // keyup-按键松开
  // keypress-按键按下并松开
  // keydown-按键按下时
  tags.addEventListener("keyup",addTags);
}
init();