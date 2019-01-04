import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Main from '../pages/main';
import Life from '../pages/life';
import List from '../pages/list';
import Mask from '../pages/mask';
import Global from '../pages/global';

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
            </Switch>
        </div>
    </BrowserRouter>
)
export default App;