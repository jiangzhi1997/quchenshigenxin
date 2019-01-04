import React, {Component} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import './header.scss'
import {Icon,Input,Drawer} from 'antd'


class Header extends Component{
        state = { visible: false };

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };
    render(){
        const pathname =this.props.location.pathname;
        return(
            <div>
                {
                    pathname === '/' || pathname === '/life'||pathname === '/global'||pathname === '/mask'?
                    <div className="qcs-header">
                        <div className="qcs-top">
                            <Icon type="user" />
                            <div>
                            <Icon type="search" />
                            <Input
                                    placeholder="面膜"
                                    onClick={this.showDrawer}
                                />
                                <Drawer
                                    placement="right"
                                    closable={false}
                                    onClose={this.onClose}
                                    visible={this.state.visible}
                                    >
                                    <div className='meiziz'>
                                        <div className="yangs">
                                            <Icon type="search" />
                                            <Input
                                                    placeholder="面膜"
                                                    onClick={this.showDrawer}
                                                />
                                        </div>
                                        <button onClick={this.onClose}>取消</button>
                                    </div><br/>
                                    <div>
                                        热门搜索
                                    </div>
                                    </Drawer>
                            </div>
                            <Icon type="shopping-cart" />
                        </div>
                        <nav className="qcs-menu">
                            <ul>
                                <li>
                                    <NavLink to="/" exact activeClassName="active">今日推荐</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/mask" activeClassName="active">面膜中心</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/life" activeClassName="active">居家生活</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/global" activeClassName="active">购全球</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>:''
                }
            </div>
            
           
        )
    }
}
export default withRouter(Header);