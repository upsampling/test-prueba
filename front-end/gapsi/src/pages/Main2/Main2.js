import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import { Button, Card, Loader,Dimmer,Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import profile from '../../assests/user2.png';
import {setTimeoutAsync} from '../../utils/timeout';
import {settingsPost2} from '../../utils/apiEndpoint';
import NavBar from '../../components/NavBar';
import './main.css';


export const Main2 = () => {

    const text = {text: 'texto de ejemplo'};

    let history = useHistory();
    const copy = 'Bienvenido a la otra página que se creó.';
    const [data, setData] = useState({
        welcome: '',
        version: '',
        text: ''
    });
    const [running,setRunning] = useState(true);
    
    const onClickMove = ()=>{
        console.log('move');
        history.push('/home')
    }

    const fillData = async ()=>{
        try {
            let result = await Axios(settingsPost2(text));
            result = result.data;
            await setTimeoutAsync(1200)
            console.log(result)
            setData(result);
            setRunning(false);
        } catch (error) {
            console.log("error->",error.response.data);
        }
    }

    useEffect(()=>{      
        fillData();
    },[]);

    return (
        <div id="container-main">
            <NavBar />
            <div id="sub-container">
                <Card>
                    <Card.Content>
                        <Card.Header textAlign='center' className="card-title" >{copy}</Card.Header>
                        <Card.Meta>
                            <Segment>
                                <Dimmer active={running}>
                                    <Loader>Cargando...</Loader>
                                </Dimmer>
                                <div className='card-content'>
                                    <img src={profile} className='img-card' alt=''/>
                                    <p className='label-card'>{data.message}</p>
                                    <span className='date label-card'>Version : {data.version}</span>
                                    <span className='date label-card'>Texto: {data.text}</span>
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
