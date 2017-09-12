

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import  App from './containers/app';
import configureStore from './stores';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Slider
} from 'react-native';
//获取store
const store=configureStore();
 class SetUp extends Component {
   componentDidMount(){
     console.log("入口文件的provider");
     console.log(Provider);
     console.log("入口文件的store");
     console.log(store);
   }
  render() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
  }
}

module.exports=SetUp;
