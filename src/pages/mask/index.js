import React,{Component} from 'react';
import axios from 'axios'
import { Progress } from 'antd';
// import Swiper from './swiper/index'
import MySwiper from '../../components/main/swiper'
import Timer from '../../components/time'
import './index.scss'
class Mask extends Component{
    constructor(){
        super();
        this.state={
            visible:true,
            swiperList:[],
            likeArr:[],
            howArr:[],
            maskArr:[]

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
        axios.get("tms/aladdin/get?code=Mask_center_banner_index_1").then((res)=>{
            console.log(res)
            this.setState({
                swiperList:res.data.data.datas
            })
        })
        axios.get("activity/specials/info?code=Mask_center_products_index_4&access_token=undefined").then((res)=>{
            console.log(res)
            this.setState({
                likeArr:res.data.data.specials_item_v_o_s
            })
        })
        axios.get("activity/specials/info?count=8&code=seckill_maskcenter_real&device_id=0e0d9cb0-1097-11e9-b044-67505241e804").then((res)=>{
            console.log(res)
            this.setState({
                howArr:res.data.data.specials_item_v_o_s
            })
        })
        axios.get("item/ws/group_list?current_page=1&page_size=24&group_id=11091&device_id=02313940-12e2-11e9-b57c-8f9df2153916").then((res)=>{
            console.log(res)
            this.setState({
                maskArr:res.data.data.item_list.slice(0,15)
            })
        })
    }
    render(){
        return(
            <div className="mianmo">
                <div className="lunbotu-one">
                    <MySwiper swiperList={this.state.swiperList}/>
                </div>
                <div className="two" >
                    <div className="two-two">
                         <div style={{'fontSize':'18px','fontWeight':'bold','textDecoration':'underline'}}>登录查看抢购资格</div>
                         <div >抢购资格可用于购买本活动优惠价商品</div>
                    </div>
                </div>
                <div className="qianggou">
                    <ul>
                        {
                            this.state.likeArr.map((item,index)=><li key={index}>
                                <div className="leftImg">
                                    <img src={item.image_url} alt="" />
                                </div>
                                <div className="right-shu">
                                    <div className="right-one">{item.item_short_name}</div>
                                    <div className="right-two"><span>抢购价￥1</span>{item.market_price/100}</div>
                                    <div className="jintutiao"><Progress percent={(item.stock_all-item.stock_left)*2} showInfo={false} /></div>
                                    <div className="right-three"><span>{item.stock_all-item.stock_left}/{item.stock_all}</span><button>{item.status_name==="已售罄"?'抢光了':'抢购'}</button></div>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
                <div>
                    <div className="shijian">
                        <span>今日秒杀</span><Timer></Timer>
                        <span className="haoduo2">更多好货</span>
                    </div>
                    <div className="miaosha">
                        
                            <ul>
                                {
                                    this.state.howArr.map((item,index)=><li key={index}>
                                        <div>
                                            
                                            <img src={item.image_url} alt=""/>
                                            <div className="width">
                                                <span className="wenzi">{item.item_short_name.slice(0,6)}</span>
                                                <p><span className="yanse">{item.promotion_price?"￥"+item.promotion_price/100:""}</span><span className="henxian">{item.market_price?'￥'+item.market_price/100:''}</span></p>
                                            </div>
                                        </div>
                                        
                                    </li>)
                                }
                            </ul>
                    </div>
                </div>
                <div className="mian-mo">
                    <ul>
                        {
                            this.state.maskArr.map((item,index)=><li key={index}>
                                <img src={item.over_image_url} alt="" />
                                <div>
                                    <span>{item.item_name.slice(0.15)}</span>
                                    <p><span className="jinbi">￥{item.min_app_price/100}</span><span className="huaxian">{item.max_market_price?'￥'+item.max_market_price/100:''}</span></p>
                                </div>
                                
                                
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default Mask;