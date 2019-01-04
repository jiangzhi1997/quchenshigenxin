import React,{Component} from 'react';
import axios from 'axios'
// import Swiper from './swiper/index'
import MySwiper from '../../components/main/swiper'
import './index.scss'
class Mask extends Component{
    constructor(){
        super();
        this.state={
            visible:true,
            swiperList:[]
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
                
            </div>
        )
    }
}
export default Mask;