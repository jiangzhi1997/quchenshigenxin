import React,{Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.min.js';
import 'swiper/dist/css/swiper.min.css';
import './swiper.scss';
class MySwiper extends Component{
	
	componentDidMount(){
		 new Swiper('.swiper-container', {
			loop:true,
			autoplay: 2000,//可选选项，自动滑动
			observer:true,//异步处理时需要添加 
			observeParents:true,
			pagination:'.swiper-pagination',
			// prevButton:'.swiper-button-prev',
			// nextButton:'.swiper-button-next'    
		})
	}
	
	render(){
		return (	
		<div className="swiper-container">
			<div className="swiper-wrapper">
			{
			  	this.props.swiperList.map((item,index)=><div key={index} className="swiper-slide" style={{'width':'100%'}}>
			  		<img src={item.image_url} alt={item.gmt_modified}/>
			  	</div>)
			} 
			</div>
		    <div className="swiper-pagination"></div>
		</div>
			
		)
	}
}

export default MySwiper;