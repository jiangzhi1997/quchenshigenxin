import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Main from '../pages/main';
import Life from '../pages/life';
import List from '../pages/list';
import Mask from '../pages/mask';
import Global from '../pages/global';
import Login from '../pages/login'
import Center from '../pages/center'
import Conten from '../pages/conten'
import Cart from '../pages/cart'
import Header from '../components/common/header'

const App=()=>(
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/life" exact component={Life}/>
                <Route path="/list" exact component={List}/>
                <Route path="/mask" exact component={Mask}/>
                <Route path="/global"  component={Global}/>
                <Route path="/login"  component={Login}/>
                <Route path="/center"  component={Center}/>
                <Route path="/conten"  component={Conten}/>
                <Route path="/cart"  component={Cart}/>
            </Switch>
        </div>
    </BrowserRouter>
)
export default App;