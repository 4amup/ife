var pushLeft = document.getElementById('pushLeft'),
    pushRight = document.getElementById('pushRight'),
    pullLeft = document.getElementById('pullLeft'),
    pullRight = document.getElementById('pullRight'),
    input = document.getElementsByTagName('input')[0],
    array = [];
// 生成容器元素
var databox = document.createElement('div');
databox.setAttribute("class","databox");
// 渲染函数
function render(array) {
  if (array.length) {
    for (var i = 0; i < array.length; i++) {
      var item = document.createElement('div');
      var height = array[i];
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
  var a = array;
  reset(a);
  for (var i = 0; i <20; i++) {
    // 生成10-100的随机数
    var num = parseInt(10 + (90 - 10) * (Math.random()));
    a.push(num);
  }
  render(a);
}
// reset所有节点的函数，即全部删除节点
function reset() {
  array = [];
  render(array);
  return array = [];
}
// 排序的函数
function sortlist() {
  var count = array.length;
  var temp;
  while(count){
    for (var i = 0; i < count-1; i++) {
      if (arr[i] > arr[i+1]){
        temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
      }
    }
    count--;
  };
  render(arr);
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
        array.unshift(input.value);
        render(array);
      }else{
        alert("请输入10-100数字！");
      }
      break;
    case pushRight:
      if (array.length>=60) {
        alert('队列元素数量最多限制为60个!');
        return false;
      }
      if (input.value<=100 && input.value>=10) {
        array.push(input.value);
        render(array);
      } else {
        alert("请输入10-100数字！");
      }
      break;
    case pullLeft:
      if (array.length) {
        alert(array.shift());
        render(array);
      } else {
        alert("当前列表为空，请输入数字后再执行删除操作！");
      }
      break;
    case pullRight:
      if (array.length) {
        alert(array.pop());
        render(array);
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
  array = temp_arr;
}
function init() {
  document.body.addEventListener('click',funcDelegation,false);
  document.body.addEventListener('click',numberDelegation,false);
  document.getElementById("sort").onclick = sortlist;
  document.getElementById("random").onclick = random20;
  document.getElementById("reset").onclick = reset();
}
init();