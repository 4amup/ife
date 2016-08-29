// 初始化一些公共变量
var tags = document.getElementById("tags");
var showtags = document.getElementsByClassName("showtags")[0];
var showhobbies = document.getElementsByClassName("showhobbies")[0];
var confirm = document.getElementById("confirm");
var aoh = new Array();
// 为数组添加一个公共方法，即数组去重
Array.prototype.unique = function(){
  var res = [];
  var json = {};
  for (var i = 0; i < this.length; i++) {
    if (!json[this[i]]) {
      res.push(this[i]);
      json[this[i]] = 1;
    }
  }
  return res;
}
// 渲染函数
function render(item,parent){
  if (!item) {
    return false;
  }
  var child = document.createElement("div");
  child.setAttribute("class","tag");
  child.innerHTML = item;
  parent.appendChild(child);
}
// 功能函数一 添加tag
function addTags() {
  if (event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 188) {
    // 去重数组
    var arr = new Array();
    // 循环将现在的添加进去
    for (var i = 0; i < showtags.childNodes.length; i++) {
      arr.push(showtags.childNodes[i].textContent);
    }
    // 处理字符串 先去掉两端的空格 再替换掉逗号或其他
    var result = tags.value.trim().replace(/[\s\r\n\,\，]/g,"");
    // 检查输入值是否重复或为空值
    if(arr.indexOf(result)>-1 || result==""){
      console.log("重复");
      tags.value=null;
      return false;
    }
    // 把符合条件的结果的值推入数组
    // 检查长度，超过10，自动把第一个删掉
    if (showtags.childNodes.length>10-1) {
      tags.value=null;
      showtags.removeChild(showtags.firstChild);
      // render(showtags);
    }
    render(result,showtags);
    tags.value=null;
  }
}
// 功能函数二 删除tag
function delTag(e) {
  if (e.target.className = "tag") {
    e.target.parentNode.removeChild(e.target);
  }
}
// 功能函数三 添加hobbies
function addHobbies() {
  var hobbies = document.getElementById("hobbies");
    if (!hobbies.value) {
    console.log("空");
    return false;
  }

  var arr = hobbies.value.split(/[\n\,\，\、\s\t]+/);
  // 重置hobbies.value为空
  hobbies.value = null;
  // 去掉末尾空值
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]=="") {
      arr.pop(arr[i]);
    }
  }
  aoh = aoh.concat(arr);
  // 去重
  aoh = aoh.unique();
  // 保留最新的十个元素
  if (aoh.length>10) {
    aoh = aoh.slice(aoh.length-10,aoh.length);
  }
  // 重置渲染对象
  for (var i = showhobbies.childNodes.length; i > 0; i--) {
    showhobbies.removeChild(showhobbies.lastChild);
  }
  // 再渲染可视化
  for (var i = 0; i < aoh.length; i++) {
    render(aoh[i],showhobbies);
  }
}
function init() {
  // keyup-按键松开
  // keypress-按键按下并松开
  // keydown-按键按下时
  tags.addEventListener("keyup",addTags);
  showtags.addEventListener("click",delTag);
  confirm.addEventListener("click",addHobbies);
}
init();