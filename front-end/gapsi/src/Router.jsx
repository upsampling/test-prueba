import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Main from './pages/Main/Main';
import Home from './pages/Home/Home';
import { Main2 } from './pages/Main2/Main2';

const Router = ()=>{
    return(
        <Switch>
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/main2'} component={Main2}/>
            <Route exact path={'/'} component={Main}/>
        </Switch>
    );
}

export default Router