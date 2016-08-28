// 初始化一些公共变量
var tags = document.getElementById("tags");
var showtags = document.getElementsByClassName("showtags")[0];
var showhobbies = document.getElementsByClassName("showhobbies")[0];
var confirm = document.getElementById("confirm");
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
    if (showtags.childNodes.length>9) {
      tags.value=null;
      showtags.removeChild(showtags.childNodes[0]);
      return render(showtags);
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
  var hobbies = document.getElementById("hobbies").value;
  if (!hobbies) {
    console.log("空");
    return false;
  }
  var arr = new Array();
  arr = hobbies.split(/[\n\,\，\、\s\t]+/);
  // 去掉末尾空值
  if (arr[arr.length-1] == "") {
    arr.pop();
  }
  // 去重

  // 保留最新的十个元素
  if (arr.length>10) {
    arr = arr.slice(arr.length-10,arr.length);
  }
  for (var i = 0; i < arr.length; i++) {
    render(arr[i],showhobbies);
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