import React,{Component} from 'react';
import axios from 'axios'

import './index.scss'

class Mywelfare extends Component{
    constructor(){
        super();
        this.state={
            dataArr:[],
            
        }
    }
    componentDidMount(){
        axios.get("aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_topBig_forcase_180105_1%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=a78bfcf0-0e2c-11e9-b882-674b42aa2c1b").then((res)=>{
            console.log(res)
            this.setState({
                dataArr:res.data.data.Home_TopicCase_170505_7.datas,
            })
        })
    }
    render(){
        return(
            <div className="abc-a">
                    <ul className = "cbc-c">
                    {
                        this.state.dataArr.map((item,index)=>{
                            return <li key={index}>
                                <img src={item.image_url} alt=""/>
                            </li>
                        })
                    }
                    </ul>
                
                
            </div>
            
        )
    }
}
export default Mywelfare;