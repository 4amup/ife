var pushLeft = document.getElementById('pushLeft');
    pushRight = document.getElementById('pushRight');
    pullLeft = document.getElementById('pullLeft');
    pullRight = document.getElementById('pullRight');
    input = document.getElementsByTagName('input')[0];
// 生成容器元素
var databox = document.createElement('div');
databox.setAttribute("class","databox");
// 随机生成50个热度条
function random50() {
  // 删除databox的现有子节点
  // 这里要特别注意，由于DOM树是动态更新的，所以倒着删除才能删干净
  if (databox.childNodes.length>0) {
    for (var i = databox.childNodes.length-1; i >0; i--) {
      databox.removeChild(databox.childNodes[i]);
    }
  }
  for (var i = 0; i <=50; i++) {
    var item = document.createElement('div');
    // 直接生成了10-100的随机数
    var height = parseInt(10 + (90 - 10) * (Math.random()));
    item.setAttribute("class","hot");
    item.setAttribute("style","height:"+height+'%;');
    item.textContent = height;
    databox.insertBefore(item,databox.firstChild);
  }
  document.body.appendChild(databox);
}
// 排序的函数
function sortlist() {
  var parent = document.getElementsByClassName('databox')[0];
  var list = document.getElementsByClassName('hot');
  var count = list.length;
  while(count){
    for (var i = 0; i < count-1; i++) {
      if (list[i].textContent > list[i+1].textContent){
        parent.insertBefore(list[i+1],list[i]);
      }
    }
    count--;
  }
}
// 代理button的点击事件
// 本函数重复较多，后续熟练以后要回头看，能否提高性能，重构
function funcDelegation(event) {
  switch(event.target)
  {
    case pushLeft:
      if (databox.childNodes.length>=60) {
        alert('队列元素数量最多限制为60个!');
        return false;
      }
      if (input.value<=100 && input.value>=10) {
        var item = document.createElement('div');
        var height = input.value;
        item.setAttribute("class","hot");
        item.setAttribute("style","height:"+height+'%;');
        item.textContent = input.value;
        databox.insertBefore(item,databox.firstChild);
        document.body.appendChild(databox);
      }else{
        alert("请输入10-100数字！");
      }
      break;
    case pushRight:
      if (databox.childNodes.length>=60) {
        alert('队列元素数量最多限制为60个!');
        return false;
      }
      if (input.value<=100 && input.value>=10) {
        var item = document.createElement('div');
        var height = input.value;
        item.setAttribute("class","hot");
        item.setAttribute("style","height:"+height+'%;');
        item.textContent = input.value;
        databox.appendChild(item);
        document.body.appendChild(databox);
      } else {
        alert("请输入10-100数字！");
      }
      break;
    case pullLeft:
      if (databox.childNodes.length) {
        alert(databox.removeChild(databox.firstChild).textContent);
      } else {
        alert("当前列表为空，请输入数字后再执行删除操作！");
      }
      break;
    case pullRight:
      if (databox.childNodes.length) {
        alert(databox.removeChild(databox.lastChild).textContent);
      } else {
        alert("当前列表为空，请输入数字后再执行删除操作！");
      }
      break;
  }
}
//代理标签的删除事件
function numberDelegation(event) {
  if (event.target.className == "hot") {
    event.target.parentNode.removeChild(event.target);
  }
}
function init() {
  document.body.addEventListener('click',funcDelegation,false);
  document.body.addEventListener('click',numberDelegation,false);
  document.getElementById("sort").onclick = sortlist;
  document.getElementById("random").onclick = random50;
  // onclick和click()方法要搞明白
}
init();