import React, { useState, useEffect } from 'react';
import { Loader, Dimmer, Segment, Table, Menu, Label, Icon, Button } from 'semantic-ui-react';
import Axios from 'axios';

import NavBar from '../../components/NavBar';
import { setTimeoutAsync } from '../../utils/timeout';
import {providerDelete, providerGet} from '../../utils/apiEndpoint';
import AddProvider from '../../modals/AddProvider';
import './home.css';


const Home = () => {
    const [running, setRunning] = useState(true);
    const [openCloseStatement, setOpenCloseStatement] = useState(false);

    const [info,setInfo] = useState([]);

    const fillData = async (page)=>{
        try {
            let result = await Axios(providerGet(page));
            result = result.data;
            await setTimeoutAsync(1200);
            setInfo(result);
            setRunning(false);
        } catch (error) {
            console.log("error->", error.response.data);
        }
    }

    useEffect(() => {
        fillData(0);
    }, []);

    const onClickRemove =  async(item)=>{
        try {
            setRunning(true)
            let result = await Axios(providerDelete(item.id));
            result = result.data;
            fillData(0);
        } catch (error) {
            console.log("error->", error.response.data);
        }
    }

    const onClickPage = (index)=>{
        setRunning(true);
        fillData(index);
    }

    const onClickAdd = () => {
        console.log('add')
        setOpenCloseStatement(true);
    }

    return (
        <div id="container-main">
            <NavBar />
            <div id="subcontainer-home">
                <div className="card-table">
                <AddProvider display={openCloseStatement} onclose={()=>{setOpenCloseStatement(false)}} />
                    <Segment className="segment">
                        <Dimmer active={running}>
                            <Loader>Cargando...</Loader>
                        </Dimmer>
                        <Icon onClick={onClickAdd} name='plus' size='big'/>
                        <Table celled className='ui celled table table'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Razon Social</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Direccion</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    info.map(item=>{
                                        return (<Table.Row key={item.id}>
                                            <Table.Cell>
                                                {item.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.email}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.address}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button onClick={()=>{onClickRemove(item)}}>
                                                    <Icon name='times' size='large'/>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>)
                                    })
                                }
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item onClick={()=>{onClickPage(0)}} as='a'>1</Menu.Item>
                                            <Menu.Item onClick={()=>{onClickPage(1)}} as='a'>2</Menu.Item>
                                            <Menu.Item onClick={()=>{onClickPage(2)}} as='a'>3</Menu.Item>
                                            <Menu.Item onClick={()=>{onClickPage(3)}} as='a'>4</Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>
                </div>
            </div>
        </div>
    );
}

export default Home;