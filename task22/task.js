console.log('init start!');
// 取得所有节点
var div11 = document.getElementById('div11');
var div7 = document.getElementById('div7');
var div15 = document.getElementById('div15');
var div5 = document.getElementById('div5');
var div9 = document.getElementById('div9');
var div3 = document.getElementById('div3');
var div6 = document.getElementById('div6');
var div8 = document.getElementById('div8');
var div10 = document.getElementById('div10');
var div12 = document.getElementById('div12');
var div14 = document.getElementById('div14');
var div18 = document.getElementById('div18');
var div25 = document.getElementById('div25');
var div11 = document.getElementById('div11');
// 公用方法
var changeNodeBg = function changeNodeBg(node) {
  console.log(node.key.textContent);
  node.key.setAttribute('class','divbg');
  // 中间要是能休息500ms就把功能实现了
  sleep(1000);
  // node.key.removeAttribute('class');
};
// sleep方法
function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime){
      return;
    };
  };
}
function BinarySearchTree() {
    // 定义新节点的构造函数
  var Node = function(key,value){
    this.key = value;
    this.left = null;
    this.right = null;
  };
  var root = null;
  // 插入方法
  this.insert = function(key,value){
    // 本方法用到的私有辅助函数
    var insertNode = function (node,newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left,newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right,newNode);
        }
      }
    };
    // 该方法主内容
    var newNode = new Node(key,value);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root,newNode); // 调用insertNode私有辅助函数
    }
  };
  // 中序遍历
  this.inOrderTraverse = function(callback){
    // 本方法用到的私有辅助函数，用于递归
    var inOrderTraverseNode = function(node,callback){
      if (node!==null) {
        inOrderTraverseNode(node.left,callback);
        callback(node);
        inOrderTraverseNode(node.right,callback);
      }
    };
    // 该方法主内容
    inOrderTraverseNode(root,callback);
  };
  // 先序遍历
  this.preOrderTraverse = function(callback){
    // 私有辅助函数
    var preOrderTraverseNode = function(node,callback){
      if (node !== null) {
        callback(node);
        preOrderTraverseNode(node.left,callback);
        preOrderTraverseNode(node.right,callback);
      }
    }
    // 该方法主要内容
    preOrderTraverseNode(root,callback);
  };
  // 后序遍历
  this.postOrderTraverse = function(callback){
    // 私有辅助函数
    var postOrderTraverseNode = function(node,callback) {
      if (node !== null) {
        postOrderTraverseNode(node.left,callback);
        postOrderTraverseNode(node.right,callback);
        callback(node);
      }
    }
    // 该方法主要内容
    postOrderTraverseNode(root,callback);
  }
}

var tree = new BinarySearchTree();
tree.insert(div11,div11);
tree.insert(div7,div7);
tree.insert(div15,div15);
tree.insert(div5,div5);
tree.insert(div3,div3);
tree.insert(div9,div9);
tree.insert(div8,div8);
tree.insert(div10,div10);
tree.insert(div13,div13);
tree.insert(div12,div12);
tree.insert(div14,div14);
tree.insert(div20,div20);
tree.insert(div18,div18);
tree.insert(div25,div25);
tree.insert(div6,div6);

tree.postOrderTraverse(changeNodeBg);