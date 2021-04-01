import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Main from './pages/Main/Main';

const Router = ()=>{
    return(
        <Switch>
            <Route exact path={'/'} component={Main}/>
        </Switch>
    );
}

export default Router