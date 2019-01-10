import React,{Component} from 'react'
import axios from 'axios'
import './index.scss'
import {Icon} from 'antd'
import BackTop from '../../mixin/BackTop'
import {Link} from 'react-router-dom';



class List extends Component{
    constructor(){
        super();
        this.state={
            topImg:'',
            listArr:[],
            page:1,
            end:false,
            type:false,
            group_id:12983,
            topArr:[
                {'id':0,'name':'洁面卸妆','group_id':'12983','type':true},
                {'id':1,'name':'水乳面霜','group_id':'12984','type':false},
                {'id':2,'name':'精华眼霜','group_id':'12985','type':false}
            ]

        }
    }
    componentDidMount(){
        axios.get("tms/aladdin/get?code=h5_topfixed_img").then((res)=>{
            console.log(res)
            this.setState({
                topImg:res.data.data.datas[0].image_url
            })
        })
        

        this.getData(this.state.group_id);

        this.Scroll();
    }
    Scroll(){
        let _this=this;
        window.onscroll=function(){
            //获取滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //获取可视高度
            let windowHeight = document.documentElement.clientHeight;
            //当前页的总高度
            let scrollHeight = document.body.scrollHeight;
            if(scrollHeight-scrollTop<=windowHeight){
               
                _this.moreDate(_this.state.page+1);
                
                _this.setState({
                    page:_this.state.page+1
                })
            }
        }
    }
    moreDate(i){
        if(!this.state.end){
            this.setState({
                type:true
            })
            axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.group_id+'&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e').then((res)=>{
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
                    setTimeout(()=>{
                        this.setState({
                            listArr:newArr,
                            type:false
                        })
                    },2000)
                }
            })
        }
    }
    goback=()=>{
        this.props.history.go(-1)
    }
    changeBorder(id,group_id){
        let newArr=this.state.topArr;
        for(var i=0;i<newArr.length;i++){
            if(i===id){
                newArr[i].type=true;
            }else{
                newArr[i].type=false;
            }
        }
        this.setState({
            topArr:newArr,
            group_id:group_id,
            page:1
        })
        this.getData(group_id)
    }
    getData(group_id){
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id='+group_id+'&device_id=a78bfcf0-0e2c-11e9-b882-674b42aa2c1b').then((res)=>{
            console.log(res)
            this.setState({
                listArr:res.data.data.item_list
            })
        })
    }
    changedetails=()=>{
        this.props.history.push('/conten')
    }
    render(){
        return(
            <div className="list-meiji">
                <div className="list-one">
                    <img src={this.state.topImg} alt=""/>
                </div>
                <h2><span onClick={this.goback}><Icon type="left" /></span><span className="center">新宠精致美肌</span></h2>
                <ul className="shuju-title">
                    {
                        this.state.topArr.map((item,index)=><li onClick={()=>this.changeBorder(item.id,item.group_id)} className={item.type?'active':''} key={index}>
                            {item.name}
                        </li>)
                    }
                </ul>
                <ul className="shuju">
                    {
                        this.state.listArr.map((item,index)=>
                            <li key={index} >
                                <Link to={{pathname:'conten',search:'?item_id='+item.item_id+'&app_price='+item.min_app_price+'&market_price='+item.min_market_price}}>
                                    <img src={item.over_image_url} alt="" />
                                    <div>
                                        <span className="top-one">{item.sale_point}</span><br/>
                                        <span className="botton-one">{item.item_name.slice(0,12)}</span>
                                    </div>
                                    <p>
                                        <span className="onetwo">￥{item.max_price/100}</span>
                                        <span className="oneThree"><Icon type="shopping-cart" /></span>
                                    </p>
                                </Link>
                            </li>
                        )
                    }
                </ul>
                <div className="loading" style={this.state.type && !this.state.end?{'display':'block'}:{'display':'none'}}>
                    <Icon type="sync" spin />正在加载...
                </div>
                <BackTop/>
                {this.state.end?<div>亲！到底了哟</div>:''}
            </div>    
        )
    }
}
export default List;