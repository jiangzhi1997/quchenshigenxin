import React,{Component} from 'react';
import axios from 'axios'
import './index.scss'
import {Icon,Badge} from 'antd'
import Timer from '../../components/time'
class Conten extends Component{
    constructor(){
        super();
        this.state={
            TopImg:'',
            itemObj:{},
            item_id:'',
            app_price:0,
            market_price:false,
            total:0
        }
    }
    componentDidMount(){
        axios.get("tms/aladdin/get?code=h5_topfixed_img").then((res)=>{
            console.log(res)
            this.setState({
                TopImg:res.data.data.datas[0].image_url
            })
        })
        let item_id = new URLSearchParams(this.props.location.search).get('item_id')
        this.setState({
            item_id:item_id,
            app_price:new URLSearchParams(this.props.location.search).get('app_price'),
            market_price:new URLSearchParams(this.props.location.search).get('marke_price')
        })
        axios.get('/item/reviews/list?item_id='+item_id+'&count=1&offset=0').then((res)=>{
			console.log(res);
			this.setState({
				itemObj:res.data.data.reviews[0]
			})
		});
        this.totalFunc();
    }
    totalFunc=()=>{
        let arr = JSON.parse(localStorage.getItem('cart'));
        var total=0;
        if(arr != null && arr.length){
            arr.map((item)=>{
                total += item.num
            })
            this.setState({
                total:total
            })
        }
    }
    addCartFunc=()=>{
        let timeout = "";
        this.setState({
            success:true
        })
        let data =[]
        let flag = true;

        let arr = JSON.parse(localStorage.getItem('cart'))
        if(arr!=null && arr.length){
            arr.map((item)=>{
                if(item.id === this.state.item_id){
                    item.num++;
                    flag = false;
                }
                data.push(item);
            })
        }
        if(flag){
            data.push({
                id:this.state.item_id,
                img_src:this.state.itemObj.sku_img_url,
                app_price:this.state.app_price,
				market_price:this.state.market_price,
				name:this.state.itemObj.sku_name,
				num:1
            })
        }
        localStorage.setItem('cart',JSON.stringify(data));
        clearTimeout(timeout)
        timeout= setTimeout(()=>{
            this.setState({
                success:false
            })
        },1000)
        this.totalFunc()
    }
    changeset=()=>{
        this.props.history.go('-1')
    }
    gohome=()=>{
        this.props.history.push('/')
    }
    goCart=()=>{
        this.props.history.push('/cart')
    }
    render(){
        let itemObj =this.state.itemObj;
        return(
            <div className="details">
                <div className="tu-one">
                    <img src={this.state.TopImg} alt="" />
                </div>
                <div className="Skull">
                    <span onClick={this.changeset}><Icon type="left" /></span>
                    <span className="Skull-right">{itemObj.sku_name}</span>
                </div>
                <div className="conten-IMG">
                    <img src={itemObj.sku_img_url} alt="" />
                </div>
                <div>
                    开箱
                </div>
                <div className="changtiao">
                    <div className="kuangkuang">
                        秒杀
                    </div>
                    <span>抢购中</span>
                    <div className="time-t">
                        剩余时间<Timer></Timer>
                    </div>
                </div>
                <div className="shouming">
                    <p>{itemObj.sku_reviews}</p>
                    <span>{itemObj.sku_name}</span><br/>
                    <span>暂无价格</span>
                </div>
                <div className="baozheng">
                    <span><Icon type="check-circle" />正品保证</span>
                    <span><Icon type="check-circle" />满￥65免邮</span>
                    <span><Icon type="check-circle" />7天退货</span>
                </div>
                <div className="lingjuan">
                    领劵<span>满299减75</span><span>满199减50</span><span>满129减20</span>
                </div>
                <div className="kuaidi">
                    配送服务<span><Icon type="check-circle" />快递配送</span>
                </div>
                <div className="dingwei">
                    <div className="left-one" onClick={this.addCartFunc}>加入购物车</div>
                    <div className="right-one">立即购买</div>
                </div>
                <div className="add-success" 
                style={this.state.success?{'display':'block'}:{'display':'none'}}>
                    添加成功
                </div>
                <div className="icon_btn" >
                    <Icon type="home" className="home" onClick={this.gohome}/>
					<Badge count={this.state.total}>
					<Icon type="shopping-cart"  className="shopping-cart" onClick={this.goCart}/>
					</Badge>
                </div>
            </div>
        )
    }
}
export default Conten;