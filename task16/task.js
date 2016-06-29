/**
 * aqiData，存储用户输入的空气指数数据
 */
var aqiData = {};
// 获取元素这两个个对象，属性个值出来，在调用String的trim方法
var	city = document.getElementById("aqi-city-input").value.trim();
var aqiValue = document.getElementById("aqi-value-input").value.trim();

var addBtn = document.getElementById("add-btn");
var table = document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//简单检测类型好像并不行，需要写正则表达式
	var regCity = /^[a-zA-Z\u4e00-\u9fa5]*[a-zA-Z\u4e00-\u9fa5]$/;
	var regAqiValue = /^\d*\d$/;
	if (regCity.test(city) && regAqiValue.test(aqiValue)) {
		aqiData.city = aqiValue;
	} else {
		alert("城市名必须为中文或英文，空气质量指数必须是整数数字，请检查您的输入。");
	}
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList(data) {
	var result = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	table.innerHTML = result;

	if (!data) {

	} else {
		
	}

	var tableRow = document.createElement("tr");
	tableRow.innerHTML = "<td>"+city+"</td><td>"+aqiValue+"</td><td><button class="del-btn">删除</button></td>";
	table.appendChild(tableRow);
	for (var i = 0; i < aqiData.length; i++) {
		Things[i]
	}
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList(aqiData);
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addBtn.setAttribute("onclick","addBtnHandle()");
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();