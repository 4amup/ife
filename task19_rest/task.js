var pushLeft = document.getElementById('pushLeft');
var pushRight = document.getElementById('pushRight');
var pullLeft = document.getElementById('pullLeft');
var pullRight = document.getElementById('pullRight');
var input = document.getElementsByTagName('input')[0];
// 生成容器元素
var databox = document.createElement('div');
databox.setAttribute("class","databox");
// 初始化数组
var data = new Array();
// 渲染函数
function render(data) {
  if (data.length) {
    for (var i = 0; i < data.length; i++) {
      var item = document.createElement('div');
      var height = data[i];
      item.setAttribute("class","hot");
      item.setAttribute("style","height:"+height+'%;');
      item.textContent = height;
      databox.insertBefore(item,databox.firstChild);
    }
    document.body.appendChild(databox);
  } else {
    return false;
  }
}
// 随机生成20个热度条函数
function random20() {
  // 删除databox的现有子节点
  var a = data;
  reset(a);
  for (var i = 0; i <20; i++) {
    // 生成10-100的随机数
    var num = parseInt(10 + (90 - 10) * (Math.random()));
    a.push(num);
  }
  render(a);
  return array;
}
// reset所有节点的函数，即全部删除节点
function reset() {
  data = [];
  render(data);
  return data = [];
}
// 排序的函数
function sortlist() {
  var count = data.length;
  var temp;
  while(count){
    for (var i = 0; i < count-1; i++) {
      if (data[i] > data[i+1]){
        temp = data[i];
        data[i] = data[i+1];
        data[i+1] = temp;
      }
    }
    count--;
  };
  render(data);
}
// 代理button的点击事件
// 本函数重复较多，后续熟练以后要回头看，能否提高性能，重构
function funcDelegation(event) {
  switch(event.target)
  {
    case pushLeft:
      // if (arr.length>=60) {
      //   alert('队列元素数量最多限制为60个!');
      //   return false;
      // }
      if (input.value<=100 && input.value>=10) {
        data.unshift(input.value);
        render(data);
      }else{
        alert("请输入10-100数字！");
      }
      break;
    case pushRight:
      if (data.length>=60) {
        alert('队列元素数量最多限制为60个!');
        return false;
      }
      if (input.value<=100 && input.value>=10) {
        data.push(input.value);
        render(data);
      } else {
        alert("请输入10-100数字！");
      }
      break;
    case pullLeft:
      if (data.length) {
        alert(data.shift());
        render(data);
      } else {
        alert("当前列表为空，请输入数字后再执行删除操作！");
      }
      break;
    case pullRight:
      if (data.length) {
        alert(data.pop());
        render(data);
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
  // 需要
  var temp_arr = [];
  for (var i = 0; i < databox.length; i++) {
    temp_arr.push(parseInt(databox[i].textContent));
  }
  // 更新数组
  data = temp_arr;
}
function init() {
  document.body.addEventListener('click',funcDelegation,false);
  document.body.addEventListener('click',numberDelegation,false);
  document.getElementById("sort").onclick = sortlist;
  document.getElementById("random").onclick = random20;
  document.getElementById("reset").onclick = reset;
}
init();