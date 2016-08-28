// 初始化一些公共变量
var tags = document.getElementById("tags");
var showtags = document.getElementsByClassName("show")[0];
// 渲染函数
function render(item,parent){
  if (!item) {
    return false;
  }
  var child = document.createElement("div");
  child.setAttribute("class","tag");
  child.innerHTML = item;
  parent.appendChild(child);

  // item.forEach(function(item){
  //   var child = document.createElement("div");
  //   child.setAttribute("class","tag");
  //   child.innerHTML = item;
  //   parent.appendChild(child);
  // })
  
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
      return render(result,showtags);
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
  // 更新数组

}

function init() {
  // keyup-按键松开
  // keypress-按键按下并松开
  // keydown-按键按下时
  tags.addEventListener("keyup",addTags);
  showtags.addEventListener("click",delTag);
}
init();