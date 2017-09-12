'use strict';

import { createStore, applyMiddleware ,combineReducers} from 'redux';
import thunk from 'redux-thunk';//引入异步操作
//引入所有的reducers,切记要在index.js封装下.
import * as reducers from '../reducers';
const middlewares = [thunk];

const createSoreWithMiddleware=applyMiddleware(...middlewares)(createStore);

//配置store信息
export default function configureStore(initialState){

  //将reducer组合起来
  const reducer=combineReducers(reducers);
  //创建store
  const store=createSoreWithMiddleware(reducer,initialState);

  return store;
}  
