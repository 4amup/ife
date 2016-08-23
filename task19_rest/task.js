var data=[];//定义存放数据的数组
var str="";//定义更新UL的字符串
var container=document.getElementById("list");
//数据更新函数
function updata(){
  container.innerHTML="";
  for(i=0;i<=data.length-1;i++){
    var lielement=document.createElement("li");
    lielement.innerText=data[i];
    lielement.style.height=data[i]*2+'px';
    lielement.style.backgroundColor= "red";
    lielement.setAttribute("id","li-"+i);
    container.appendChild(lielement);
  }
  document.getElementById("inputbox").value="";
}
//输入并处理数据的函数
function inputnum(){
  input=document.getElementById("inputbox").value.trim();
  if(data.length>=60){alert("数据已满");return 0;}
  if(input>=100||input<=10){alert("输入不合法");return 0;}
  if(input==""){alert("输入不合法");return 0;}
  if(isNaN(input)){alert("输入不合法");return 0;}
}
//时间绑定与处理
var lin=document.getElementById("leftin").onclick=function(){
    //若输入不合法则跳出函数
    if(inputnum()==0)return;
    data.splice(0,0,input);
    updata();
  };
var rin=document.getElementById("rightin").onclick=function(){
    if(inputnum()==0)return;
    data.push(input);
    updata();
  };
var rout=document.getElementById("rightout").onclick=function(){
    alert(data.pop());
    updata();
  };
var lout=document.getElementById("leftout").onclick=function(){
    alert(data.splice(0,1));
    updata();
  };
//下面是点击删除的代码
container.addEventListener("click",function(e) {
  if(e.target.nodeName!="LI")return;//若点击的不是LI标签,则返回
  liid = parseInt(e.target.getAttribute("id").substr(3));
  console.log(liid);
  data.splice(liid,1);
  updata();
});
//随机生成数据
document.getElementById("random").onclick=function(){
  for(i=0;i<=50;i++){
    data[i]=Math.floor(Math.random()*91+9);
  }
  updata();
};
//排序算法
document.getElementById("sortdata").onclick=function(){
  var i = 0,j = 1,temp;
      len = data.length;
      timer = null;
  timer = setInterval(run,25);
  function run() {
    if (i < len) {
      if (j < len) {
        if (data[i] > data[j]) {
          temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          updata();
        }
        j++;
      } else {
        i++;
        j = i + 1;
      }
    } else {
      clearInterval(timer);
      return;
    }
  }
}