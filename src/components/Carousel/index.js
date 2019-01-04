import React,{Component} from 'react';
import axios from 'axios'

import './index.scss'
class MyCarousel extends Component{
    constructor(){
        super();
        this.state={
            carousel:[]
        }
    }
    componentDidMount(){
        axios.get("activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=a78bfcf0-0e2c-11e9-b882-674b42aa2c1b").then((res)=>{
            console.log(res)
            this.setState({
                carousel:res.data.data.specials_item_v_o_s
            })
        })
    }
    render(){
        return(
            <div className="title-wap">
                <ul className="title-aba">
                    {
                    this.state.carousel.map((item,index)=>{
                        return  <li className="title-mmm" key={index}>
                        <img src={item.image_url} alt=""/>
                        <div>{item.item_short_name}</div>
                        <span>
                            <div className="span-one">
                                <span className="span-kk">￥{item.promotion_price?item.promotion_price/100:item.market_price}</span>
                            </div>
                            <div className="span-three">
                                <span className="span-yy">{item.market_price?"￥"+item.market_price/100:""}</span>
                            </div>
                            

                        </span>
                    </li>
                    })
                }
                </ul>
            </div>
        )
    }
}
export default MyCarousel;