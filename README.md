#使用说明：
最近总有人问宝宝关于如何在React native去使用Redux 这里写了个Demo 主要是讲述了这一点   
#安装说明： 
```js
git clone xxx  
cd demo 
npm XXX
react-native run-ios
```

## 运行结果： 
![login](1.png)
##最简单的Redux案例，麻雀虽小 ，五脏俱全哦
``js

//导入redux中的创建store方法
import { createtStore } from 'redux';

// 1: 新建store,通过reducer创建
// 这里是一个reducer,参数是旧的state和所传递过来的action
function counter(state=0,action){
	switch (action.type){
		case "jia":
		  return state+1
		case "jian" :
		  return state-1
		default:
		  return 10
	}
 }
const store = createStore()


//拿到初始化的state 
const init = store.getState();
console.log(init)

//改变 派发事件,将action发送过去
store.dispatch({type:'jia'})
store.dispatch({type:'jian'})
store.dispatch({type:'jia'})


//监听,每次更新后都会触发监听

function listener(){
	const current = store.getState();
	console.log(current);
}

store.subscribe(listener)

``