import React,{Component} from 'react';
import {Modal} from 'antd'
import './main.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'



import MyCarousel from '../../components/Carousel'

import Myshopping from '../../components/shopping'
// import Mycenter from '../../components/center'
import MyEmollient from '../../components/Emollient'
import MyLipstick from '../../components/Lipstick'
import MyShampoo from '../../components/Shampoo'
import Myappliances from '../../components/appliances'
import Mywelfare from '../../components/welfare'
import MyNursing from '../../components/Nursing'
// import ReactSwiper from 'reactjs-swiper';
import BackTop from '../../mixin/BackTop'
import Timer from '../../components/time'

function onChange(a, b, c) {
    // console.log(a, b, c);
  }

class Main extends Component{
    constructor(){
        super();
        this.state={
            visible:true,
            swiperList:[],
            dataTime:'',
            maskImg:'',
            titleImg:''
        }
    }
    handleOk = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}
	
	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}
    componentDidMount(){
        axios.get("aladdin/get_batch_data?codes=['chajian']&version=&app_channel=wap&plat=wap&access_token=&device_id=56945b10-0b3b-11e9-b6a5-1f911e12c986").then((res)=>{
            console.log(res)
            this.setState({
                swiperList:res.data.data.chajian.datas
            })
        })
        axios.get("activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=a78bfcf0-0e2c-11e9-b882-674b42aa2c1b").then((res)=>{
            console.log(res)
            this.setState({
                dataTime:res.data.specials_info_d_t_o
            })
        })
        axios.get("topic/data/T20190104113548494?device_id=02313940-12e2-11e9-b57c-8f9df2153916").then((res)=>{
            console.log(res)
            this.setState({
                titleImg:res.data.data.layout[9].content.image
            })
        })
        axios.get("topic/data/T20190104113548494?device_id=02313940-12e2-11e9-b57c-8f9df2153916").then((res)=>{
            console.log(res)
            this.setState({
                maskImg:res.data.data.layout[10].content.image
            })
        })
    }
    
    
    render(){
        return(
            <div className="fime" style={{'background':'#FAFAFA'}}>
                <div>
                    <img src="https://image.watsons.com.cn//upload/dc0869f4.jpg" alt="alt"/>
                </div>
           
                <div className="qcs-jz">
                        <div className="Celebration">
                                <ul>
                                    <li><img src="https://image.watsons.com.cn//upload/99c80c51.jpg" alt="alt"/></li>
                                    <li><img src="https://image.watsons.com.cn//upload/91a302ad.jpg" alt="alt"/></li>
                                    <li><img src="https://image.watsons.com.cn//upload/be7e10ea.jpg" alt="alt"/></li>
                                    <li><img src="https://image.watsons.com.cn//upload/50a8618a.jpg" alt="alt"/></li>
                                </ul>
                            </div>
                            <div className="envelopes">
                                <ul>
                                    <li><img src="https://image.watsons.com.cn//upload/a151dbab.jpg" alt="alt"/></li>
                                    <li><img src="https://image.watsons.com.cn//upload/2204cc4d.jpg" alt="alt"/></li>
                                </ul>
                        </div>
                </div>
                <div className="Moving">
                    <div className="Moving-title">
                        <span>今日秒杀</span><Timer></Timer>
                        <span className="haoduo">更多好货</span>
                    </div>
                    <MyCarousel afterChange={onChange}></MyCarousel>
                </div>
                <div>
                    <img src="https://image.watsons.com.cn//upload/35921115.jpg" alt="" />
                </div>
                <div className="go-shop">
                    <Myshopping></Myshopping>
                </div>
                <div>
                    <img src={this.state.titleImg} alt=""/>
                </div>
                <div>
                    <Link to="/list"><img src={this.state.maskImg} alt=""/></Link>
                </div>
                <div className="MyEmollient">
                    <MyEmollient></MyEmollient>
                </div>
                <div>
                    <img src="https://image.watsons.com.cn//upload/c07e1956.jpg" alt="" />
                </div>
                <div>
                    <MyLipstick></MyLipstick>
                </div>
                <div>
                    <img src="https://image.watsons.com.cn//upload/e9c2df55.jpg" alt=""/>
                </div>
                <div>
                    <MyShampoo></MyShampoo>
                </div>
                <div>
                    <img src="https://image.watsons.com.cn//upload/91f5c8c8.jpg" alt=""/>
                </div>
                <div>
                    <Myappliances></Myappliances>
                </div>
                <div className="Stylish">
                    <img src="https://image.watsons.com.cn//upload/2a161902.jpg" alt=""/>
                    <img src="https://image.watsons.com.cn//upload/87f8d31c.jpg" alt=""/>
                </div>
                <div>
                    <img src="https://image.watsons.com.cn//upload/8c3676f5.jpg" alt=""/>
                </div>
                
                <div className="welfare">
                    <Mywelfare></Mywelfare>
                </div>
                <div>
                    <MyNursing></MyNursing>
                </div>
                    <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <img src="https://image.watsons.com.cn//upload/6db00343.png" alt=""/>
                    </Modal>
                
                <div className="text-abc">
                    <span>版权所有鄂ICP备11005814号-10</span><br/>
                    <span>粤公网安备 44010402000077号</span><br/>
                    <span>广州屈臣氏个人用品商店有限公司</span><br/>
                    <span>地址：广州市越秀区东风东路丽丰中心</span>
                </div>
               <BackTop></BackTop>
            </div>
            
        )
    }
}
export default Main;