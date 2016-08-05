var pushLeft = document.getElementById('pushLeft');
    pushRight = document.getElementById('pushRight');
    pullLeft = document.getElementById('pullLeft');
    pullRight = document.getElementById('pullRight');
    databox = document.createElement('div');
    databox.setAttribute("class","databox");
    input = document.getElementsByTagName('input')[0];
// 排序的函数
function sortlist(argument) {
  // body...
}
// 代理button的点击事件
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
        return databox.insertBefore(item,databox.firstChild);
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
        return databox.appendChild(item);
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
  document.body.appendChild(databox);
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
  // document.getElementById("sort").onclick
  // onclick和click()方法要搞明白
}
init();