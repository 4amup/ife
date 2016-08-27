var pushLeft = document.getElementById('pushLeft');
    pushRight = document.getElementById('pushRight');
    pullLeft = document.getElementById('pullLeft');
    pullRight = document.getElementById('pullRight');
    input = document.getElementsByTagName('input')[0];
// 生成容器元素
var databox = document.createElement('div');
databox.setAttribute("class","databox");
// 随机生成20个热度条函数
function random20() {
  // 删除databox的现有子节点
  resetAll();
  for (var i = 0; i <20; i++) {
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
// reset所有节点的函数，即全部删除节点
function resetAll() {
  if (databox.childNodes.length) {
    for (var i = databox.childNodes.length-1; i>=0; i--){
      databox.removeChild(databox.childNodes[i]);
    }
  }
}
// 排序的函数
function sortlist() {
  var list = document.getElementsByClassName('hot');
  var count = list.length;
  while(count){
    for (var i = 0; i < count-1; i++) {
      if (list[i].textContent > list[i+1].textContent){
        databox.insertBefore(list[i+1],list[i]);
      }
    }
    count--;
  }
  // 显示当前参加排序的元素数目
  // alert(databox.childNodes.length);
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
  document.getElementById("random").onclick = random20;
  document.getElementById("reset").onclick = resetAll;
}
init();