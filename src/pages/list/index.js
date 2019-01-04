import React,{Component} from 'react'
import axios from 'axios'
import './index.scss'
import {Icon} from 'antd'
import BackTop from '../../mixin/BackTop'



class List extends Component{
    constructor(){
        super();
        this.state={
            topImg:'',
            listArr:[],
            page:1,
            end:false

        }
    }
    componentDidMount(){
        axios.get("tms/aladdin/get?code=h5_topfixed_img").then((res)=>{
            console.log(res)
            this.setState({
                topImg:res.data.data.datas[0].image_url
            })
        })
        axios.get("item/ws/group_list?current_page=1&page_size=24&group_id=12983&device_id=a78bfcf0-0e2c-11e9-b882-674b42aa2c1b").then((res)=>{
            console.log(res)
            this.setState({
                listArr:res.data.data.item_list
            })
        })
        this.Scroll();
    }
    Scroll(){
        let _this=this;
        window.onscroll=function(){
            //获取滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //获取可视高度
            let windowHeight = document.documentElement.clientHeight;
            //加载的第几页
            let count = Math.floor(scrollTop/(windowHeight-50))+1;
            if(count>1){
                for(let i=2;i<=count;i++){
                    if(i>_this.state.page){
                        _this.moreDate(i);
                        
                        _this.setState({
                            page:_this.state.page+1
                        })
                    }
                }
            }
        }
    }
    moreDate(i){
        if(!this.state.end){
            axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id=12983&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e').then((res)=>{
                console.log(res)
                if(res.data.data.item_list===undefined){
                    this.setState({
                        end:true
                    })
                }else{
                    let oldArr=this.state.listArr;
                    let newArr=[];
                    newArr = oldArr.concat(res.data.data.item_list)
                    console.log(newArr);
                    this.setState({
                        listArr:newArr
                    })
                }
            })
        }
    }
    goback=()=>{
        this.props.history.go(-1)
    }
    render(){
        return(
            <div className="list-meiji">
                <div className="list-one">
                    <img src={this.state.topImg} alt=""/>
                </div>
                <h2><span onClick={this.goback}><Icon type="left" /></span><span className="center">新宠精致美肌</span></h2>
                <ul>
                    {
                        this.state.listArr.map((item,index)=>
                            <li key={index}>
                                <img src={item.over_image_url} alt="" />
                                <div>
                                    <span className="top-one">{item.sale_point}</span><br/>
                                    <span className="botton-one">{item.item_name}</span>
                                </div>
                                <p>
                                    <span className="onetwo">￥{item.max_price/100}</span>
                                    <span className="oneThree"><Icon type="shopping-cart" /></span>
                                </p>
                            </li>
                        )
                    }
                </ul>
                <BackTop/>
                {this.state.end?<div>亲！到底了哟</div>:''}
            </div>    
        )
    }
}
export default List;