import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import { Button, Card, Loader,Dimmer,Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import profile from '../../assests/user.png';
import {setTimeoutAsync} from '../../utils/timeout';
import {settingsGet} from '../../utils/apiEndpoint';
import NavBar from '../../components/NavBar';
import './main.css';

const Main = () => {
  let history = useHistory();

  const copy = 'Bienvenido al sistema de proveedores para gapsi';
  const [data, setData] = useState({
    welcome: '',
    version: ''
  });
  const [running,setRunning] = useState(true);
  
  const onClickMove = ()=>{
    console.log('move');
    history.push('/home')
  }

  useEffect(()=>{
    async function fillData(){
        try {
            await setTimeoutAsync(1200)
            let result = await Axios(settingsGet());
            result = result.data;
            setData(result);
            setRunning(false);
        } catch (error) {
            console.log("error->",error.response.data);
        }
    }       
    fillData();
},[]);

  return (
    <div id="container-main">
      <NavBar />
      <div id="sub-container">
        <Card>
          <Card.Content>
            <Card.Header textAlign='center' >{copy}</Card.Header>
            <Card.Meta>
              <Segment>
                <Dimmer active={running}>
                  <Loader>Cargando...</Loader>
                </Dimmer>
                  <div className='card-content'>
                    <img src={profile} className='img-card' alt=''/>
                    <p className='label-card'>{data.message}</p>
                    <span className='date label-card'>Version : {data.version}</span>
                  </div>
              </Segment>  
            </Card.Meta>
            <Card.Description>
              <Button content='Ingresa...' onClick={onClickMove} />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export default Main;