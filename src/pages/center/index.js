import React,{Component} from 'react';
import {Icon } from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import './index.scss'
class Center extends Component{
    constructor(){
        super();
        this.state={
            tokenType:1
        }
    }
    componentWillMount(){
        axios({
            method:'get',
            url:'http://192.168.2.251:7001/center',
            headers:{
                'Authorization':localStorage['token']
            }
        }).then((res)=>{
            console.log(res);
            if(res.data.code === 0){
                this.setState({
                    tokenType:true
                })
            }else{
                this.props.history.push('/login')
            }
        })
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }

    useName=()=>{
        // localStorage['token']='';
        this.props.history.go(-1)
    }
    changefanhui=()=>{
        // localStorage['token']='';
        this.props.history.push('/')
    }
    logout=()=>{
        localStorage['token']='';
        this.props.history.push('/login')
    }
    render(){
        if(this.state.tokenType){
            return(
                <div className="denglu">
                    <div style={{'background':'#F4F4F4'}}>
                        <div className="top-title">
                            <div className="fanhui">
                                <span onClick={this.useName}><Icon type="left" /></span>
                                <span><Icon type="shopping-cart" /></span>
                            </div>
                            <div className="tupian">
                                <img src="http://image.watsons.com.cn/upload/hahy4f2323.png" alt=''/>
                                小智
                            </div>
                            <div className="shouye">
                                <span style={{'fontSize':'16px'}}><Icon type="home" theme="filled" /></span>
                                <span onClick={this.changefanhui}>回到首页<Icon type="right" /></span>
                            </div>
                        </div>
                        <div className="dingdan">
                            <div className="quanbu">
                                <span>全部订单</span>
                                <span><Icon type="right" /></span>
                            </div>
                            <div className="narbar">
                                <ul>
                                    <li>
                                        <span className="nar-one">
                                            <Icon type="wallet" />  
                                        </span>
                                        <p>代付款</p>
                                    </li>
                                    <li>
                                        <span className="nar-one">
                                            <Icon type="gift" />  
                                        </span>
                                        <p>代发货</p>
                                    </li>
                                    <li>
                                        <span className="nar-one">
                                            <Icon type="car" theme="filled" />  
                                        </span>
                                        <p>待收货</p>
                                    </li>
                                    <li>
                                        <span className="nar-one">
                                            <Icon type="smile" />  
                                        </span>
                                        <p>待评价</p>
                                    </li>
                                    <li>
                                        <span className="nar-one">
                                            <Icon type="pay-circle" />  
                                        </span>
                                        <p>退货</p>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                        <div className="wocai">
                            <span className="baside"><p>我猜你经常用</p></span>
                            <ul>
                                <li>
                                    <span><Icon type="mail" /></span>
                                    <p>消息</p>
                                </li>
                                <li>
                                    <span><Icon type="money-collect" /></span>
                                    <p>优惠卷</p>
                                </li>
                                <li>
                                    <span><Icon type="usergroup-delete" /></span>
                                    <p>我的拼团</p>
                                </li>
                                <li>
                                    <span><Icon type="environment" /></span>
                                    <p>收货地址</p>
                                </li>
                                <li>
                                    <span><Icon type="customer-service" /></span>
                                    <p>联系客服</p>
                                </li>
                                <li>
                                    <span><Icon type="idcard" /></span>
                                    <p>会员卡</p>
                                </li>
                                <li>
                                    <span><Icon type="message" /></span>
                                    <p>建议反馈</p>
                                </li>
                                <li onClick={this.logout}>
                                    <span ><Icon type="poweroff" /></span>
                                    <p>退出登录</p>
                                </li>
                                <li>
                                    <span><Icon type="exclamation-circle" /></span>
                                    <p>关于我们</p>
                                </li>
                                <li>
                                    <span><Icon type="lock" /></span>
                                    <p>隐私政策</p>
                                </li>
                            </ul>
                        </div>   
                        <div className='txt'>
                                <p>版权所有鄂ICP备11005814号-10</p>
                                <p>粤公网安备 44010402000077号</p>
                                <p>广州屈臣氏个人用品商店有限公司</p>
                                <p>地址：广州市越秀区东风东路丽丰中心</p>
                                
                        </div>    
                    </div> 
                </div>
            )
        }else{
            return <Redirect to='/login'/>
        }
        
    }
}
export default Center;