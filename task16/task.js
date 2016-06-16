/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	// 获取元素这两个个对象，属性个值出来，在调用String的trim方法
	city = document.getElementById("aqi-city-input").value.trim();
	aqiValue = document.getElementById("aqi-value-input").value.trim();
	// 测试语句
	// alert(city+aqiValue);
	//简单检测类型好像并不行，需要写正则表达式
	var regCity = /^[a-zA-Z\u4e00-\u9fa5]*[a-zA-Z\u4e00-\u9fa5]$/;
	var regAqiValue = /^\d*\d$/;
	if (regCity.test(city) && regAqiValue.test(aqiValue)) {
		// alert("over");
		aqiData.city = aqiValue;
	} else {
		// 待优化，以后可以做成添加一个文本提示进页面，warning类
		alert("城市名必须为中文或英文，空气质量指数必须是整数数字，请检查您的输入。");
	}
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var tableRow = document.createElement("tr");
	tableRow.innerHTML = "<td>"+city+"</td><td>"+aqiValue+"</td><td><button>删除</button></td>";
	table.appendChild(tableRow);
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  var city,aqiValue;
  addAqiData();
  renderAqiList();
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
  var button = document.getElementById("add-btn");
  button.setAttribute("onclick","addBtnHandle()");
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();