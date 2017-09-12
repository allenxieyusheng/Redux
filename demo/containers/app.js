import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from '../actions/loginActions';//导入需要绑定的actions
import Modal from 'react-native-modalbox';
import Home from './home';


/**
登陆页面
**/
class Login extends Component{

  constructor(props){
    super(props);

    this.state={
      phone:"",
      password:"",
    }

    this.login=this.login.bind(this);
    this.onChangePhone=this.onChangePhone.bind(this);
    this.onChangePswd=this.onChangePswd.bind(this);
  }

   onChangePhone(text){
     this.setState({'phone':text,});
   }

   onChangePswd(text){
     this.setState({'password':text,});
   }

   login(){
     if(!this.state.phone||!this.state.password){
       Alert.alert('温馨提示','用户名或密码不能为空！');
     }else{
       this.refs.modal.open();//loading 状态
      //  console.log(this.props.actions);
      //  console.log(this.state.phone);
      //  console.log(this.state.password);
        this.props.actions.login({'phone':this.state.phone,'password':this.state.password});//dispath 登陆
     }
   }

   //该方法首次不会执行，如果返回false，则reduer不会执行，，
   shouldComponentUpdate(nextProps,nextState){
     console.log(this.props.isLoggedIn);
     console.log(nextProps.isLoggedIn);
     const {isLoggedIn,navigator}=nextProps;
     console.log(nextProps.isLoggedIn);
      if(isLoggedIn){
        this.setState({phone:'',password:''});
        // navigator.push({
        //   component:Home,
        //   name:'Home',
        // });
        console.log("开始跳转");
      }
     return true;
   }
   componentDidMount(){
//
  console.log("DID");
  console.log(this.state.phone);
   }
   render(){
     return(
      <View style={{flex:1}}>
        <View style={{padding:20,marginTop:50}}>
          <View style={styles.item}>
            <Text style={{width:70}}>手机号码</Text>
            <TextInput
            style={styles.input}
            onChangeText={this.onChangePhone}
            placeholder='请输入手机号码'
            value={this.state.phone}
            />
          </View>
        <View style={styles.item}>
        <Text style={{width:70}}>密码</Text>
        <TextInput
        style={styles.input}
        onChangeText={this.onChangePswd}
        placeholder='请输入密码'
        password={true}
        value={this.state.password}
        />
        </View>

        <TouchableHighlight style={styles.button}
         underlayColor='#000000' onPress={this.login}>
        <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
        </TouchableHighlight>
        </View>

        <Modal
        style={styles.modal}
        ref='modal'
        isOpen={this.props.status=='doing'?true:false}
        animationDuration={0}
        position={"center"}
        >
        <ActivityIndicator
        size='large'
        />
        <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>登陆中...</Text>
        </Modal>
      </View>
     );
   }
}

const styles =StyleSheet.create({
    item:{
      flexDirection:'row',
      alignItems:'center',
      height:50,
      borderBottomColor:'#ddd',
      borderBottomWidth:1,
      marginTop:50
    },
    input:{
      flex:1,
      fontSize:14,
    },
    button:{
      backgroundColor:'#1a191f',
      height:50,
      marginTop:40,
      justifyContent:'center',
      alignItems:'center'
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      width:150,
      height:150,
      borderRadius:10,
    },
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state){
  console.log("登录界面");
  console.log(state);
  console.log(state.default.isLoggedIn);
  return{
    isLoggedIn:state.default.isLoggedIn,
    status:state.default.status,
  };
}
//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
function mapDispatchToProps(dispatch){
  console.log("登录界面的dispatch");
  // console.log(dispatch);
  return {
      actions: bindActionCreators(actionCreators, dispatch)
  };
}

//链接起来
export default connect(mapStateToProps,mapDispatchToProps)(Login);
