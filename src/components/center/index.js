import React,{Component} from 'react';
import axios from 'axios'

import './index.scss'
import {Icon} from 'antd'
class Mycenter extends Component{
    constructor(){
        super();
        this.state={
            CenterArr:[]
        }
    }
    componentDidMount(){
        axios.get("item/ws/group_list?current_page=1&page_size=24&group_id=12780&device_id=a78bfcf0-0e2c-11e9-b882-674b42aa2c1b").then((res)=>{
            console.log(res)
            this.setState({
                CenterArr:res.data.data.item_list
            })
        })
    }
    render(){
        return(
            <div className="narbar-a">
                <ul className = "souch-b">
                {
                    this.state.CenterArr.map((item,index)=>{
                        return <li key={index}>
                            <img src={item.over_image_url} alt=""/>
                            <div className="oneneo">{item.item_long_name}</div>
                            <span>
                                <div className="span-one">
                                    <span className="span-kk">￥{item.min_price?item.min_price/100:item.max_market_price}</span>
                                </div>
                                <div className="span-three">
                                    <span className="span-yy">{item.max_market_price?"￥"+item.max_market_price/100:""}</span>
                                </div>
                                <div className="span-two"><Icon type="shopping-cart" /></div>

                            </span>
                        </li>
                    })
                }
                </ul>
            </div>
        )
    }
}
export default Mycenter;