/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 调试代码
  console.log('addEventListener is working');
  // 确定是否选项发生了变化 
  var graTime = document.getElementsByName('gra-time');
  for (var i = 0; i < graTime.length; i++) {
    if(graTime[i].checked){
      var value = graTime[i].value;
      break;
    }
  }

  // 设置对应数据
  switch(value){
    case 'day':
      console.log('is day');
      break;
    case 'week':
      console.log('is week');
      break;
    case 'month':
      console.log('is month');
      break;
  }
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 调试代码
  console.log('city is changed!')
  // 确定是否选项发生了变化 
  var city = this.value;
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var formGraTime = document.getElementById('form-gra-time');
  // 事件委托
  formGraTime.addEventListener('click',function(event){
    if (event.target && event.target.nodeName == "INPUT") {
      graTimeChange();
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectCity = document.getElementById("city-select");
  var cityArr = [];
  for (var i in aqiSourceData) {
  	cityArr.push(i);
  }
  var optionsHTML="";
  for (var i = 0; i < cityArr.length; i++) {
  	optionsHTML += "<option>"+cityArr[i]+"</option>";
  }
  pageState.nowSelectCity = cityArr[0];
  selectCity.innerHTML = optionsHTML;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  selectCity.onchange = citySelectChange;
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var week = {},count=1;
  var month = {},mcount=0;

  for(var city in aqiSourceData){
    console.log(city);
    week[city] = {};
    var sum = 0;
    var weekCount = 0;
    for(date in aqiSourceData[city]){
      sum+=aqiSourceData[city][date];
      weekCount++;
      var x = new Date(date);
      if (x.getDay() == 0 || date=="2016-03-31") {
        week[city]["第"+count+"周"]= sum/weekCount;
        console.log("第"+count+"周:"+sum/weekCount);
        sum = 0;
        weekCount = 0;
        count++;
      }
    }
    count = 1;
  }
  for(var city in aqiSourceData){
    console.log(city);
    month[city] = {};
    var sum = 0;
    var monthCount = 0;
    for(date in aqiSourceData[city]){
      var x = new Date(date);
      if (x.getMonth() <= monthCount && date!="2016-03-31") {
        sum+=aqiSourceData[city][date];
        mcount++;
      }else{
        month[city]["第"+(monthCount+1)+"月"]= sum/mcount;
        console.log("第"+(monthCount+1)+"月:"+sum/mcount);
        monthCount++;
        sum = 0;
        mcount = 0;
      }
    }
  }
  // 处理好的数据存到chartData中
  chartData.day = aqiSourceData;
  chartData.week = week;
  chartData.month = month;
  console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();