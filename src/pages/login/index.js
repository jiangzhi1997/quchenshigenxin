import React,{Component} from 'react';
import {Icon,Input,Button,Radio} from 'antd'
import './index.scss'
import axios from 'axios'
class Login extends Component{
    constructor(){
        super();
        this.state={
            phone:'',
            smsCode:'',
            des:'',
            buttonText:'发送验证码',
            disabled:false
        }
    }
    changePhoneFunc=(ev)=>{
        this.setState({
            phone:ev.target.value
        })
    }
    changeSmsCodeFunc=(ev)=>{
        this.setState({
            smsCode:ev.target.value
        })
    }
    //获取验证码
    sendSmsCode=()=>{
        let reg = /\S/;

        let re = /^1[34578]\d{9}$/;

        let phone =this.state.phone;  //trim()清除前后空格

        if(phone === '' || !reg.test(phone)){
            alert("请输入手机号码");
        }else if(!re.test(phone)){
            alert("手机号码格式错误");
        }else{
            axios(
                {
                    method:'get',
                    url:'http://192.168.2.251:7001/sms/addSms?phone=15874026342'
                }
            ).then((res)=>{
                console.log(res);
                this.setState({
                    des:res.data.success,
                    disabled:true
                })
                let i=59;
                let inter =setInterval(()=>{
                    this.setState({
                        buttonText:'重发('+i+'s)',
                    })
                    if(i<=0){
                        this.setState({
                            buttonText:'获取验证码',
                            des:'',
                            disabled:false
                        })
                        clearInterval(inter);
                    }
                    i=i-1;
                },1000)
            })
        }
    }
    loginFunc=()=>{
        let reg = /\S/;

        let re = /^1[34578]\d{9}$/;
        let reSms=/^\d{4}$/

        let phone =this.state.phone.trim();
        let smsCode = this.state.smsCode.trim();
        if(phone==='' || !reg.test(phone)){
            alert("请输入手机号码");
        }else if(smsCode ==='' || !reg.test(smsCode)){
            alert("请输入验证码")
        
        }else if(!re.test(phone)){
            alert("手机号码格式错误");

        }else if(!reSms.test(smsCode)){
            alert("验证码格式错误")
        }else{
            var params = new URLSearchParams();
            params.append('phone',this.state.phone);
            params.append('smsCode',this.state.smsCode);
            axios({
                method:'post',
                url:'http://192.168.2.251:7001/user/login',
                data:params
            }).then((res)=>{
                console.log(res);
                localStorage['token'] = res.data.data.token;
                this.props.history.push('/center');
            }).catch((err)=>{
                this.setState({
                    
                })
                this.props.history.push('/login')
            })
        }
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    //点击返回首页
    changeturu=()=>{
        this.props.history.push('/')
    }
    render(){
        return(
            <div className="fime-Login">
                <div className="Smoll-login">
                    <span className="login-left" onClick={this.changeturu}><Icon type="left" /></span>
                    <span className="login-center">登录/注册</span>
                </div>
                <div className="cent-center">
                    <div className="center-phone">
                        <Input type="text" placeholder="请输入手机号" name="phone" onInput={this.changePhoneFunc} />
                    </div>
                    <div className="center-Code">
                        <Input className="yzm" type="text" placeholder="请输入验证码" name="smsCode" onInput={this.changeSmsCodeFunc} />
                        <Button className="Code-btn" type="primary"  disabled={this.state.disabled} onClick={this.sendSmsCode}>{this.state.buttonText}</Button>
                        <div className="des">{this.state.des}</div>
                    </div>
                    <div className="xieyi">
                        <Radio>登录/注册即同意<a href="//h5.watsons.com.cn/serviceAgreement">用户协议</a>和<a href="//asset.watsons.com.cn/m/privacypolicy.html ">隐私政策</a></Radio>
                    </div>
                    <div className="big-btn">
                        <Button className="login-btn" type="primary" onClick={this.loginFunc}> 登录/注册</Button>
                    </div>
                </div>
                <div className="jiewei">
                    版权所有鄂ICP备11005814号-10<br/>
                    粤公网安备 44010402000077号<br/>
                    广州屈臣氏个人用品商店有限公司<br/>
                    地址：广州市越秀区东风东路丽丰中心
                </div>
            </div>
        )
    }
}
export default Login;