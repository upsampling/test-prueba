import React, { useState } from "react";
import { Form, Modal, Button } from 'semantic-ui-react';
import Axios from 'axios';
import _ from 'lodash';
import { providerCreate } from "../utils/apiEndpoint";
import { setTimeoutAsync } from '../utils/timeout';

const AddProvider = ({ onclose, display }) => {
    const [message, setMessage] = useState('');
    const [provider,setProvider] = useState({});
    const handlerClickOk = async () => {
        try {
            console.log('click')
            const form = Object.keys(provider);

            if(form.length !== 4){
                setMessage('Campos faltantes');
                throw 'faltantes';
            }

            form.map(item=>{
                console.log(_.isEmpty(provider[item]),item);
                if( _.isEmpty(provider[item])){
                        setMessage('Campos faltantes');
                        throw 'faltantes';
                }
            });
            setMessage('Cargando...');
            console.log("asdf", provider)
            let result = await Axios(providerCreate(provider));
            result = result.data;
            console.log(result)
            setMessage('');
            setProvider({});
            await setTimeoutAsync(1200);
            onclose();
        } catch (error) {
            setMessage('formato Erroneo');
            console.log(error)
            await setTimeoutAsync(1200)
            setMessage('');
        }

    }
    const handlerChangeInput = (event) =>{
        const {value,name} = event.target;
        let providerTemp = _.cloneDeep(provider);
        providerTemp[name] = value;
        setProvider(providerTemp);
        console.log(providerTemp)
        
    }
    return (<Modal onClose={onclose}
        onOpen={() => { }}
        open={display}>
        <Modal.Header>Carga un proveedor</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <p>
                    {message}
                </p>
                <div style={{ marginTop: '13px' }}>
                    <Form>
                        <Form.Field>
                            <label>Razon Social</label>
                            <input onChange={(handlerChangeInput)} placeholder='Razon Social' name='name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input onChange={(handlerChangeInput)} placeholder='Email' name='email' />
                        </Form.Field>
                        <Form.Field>
                            <label>Telefono</label>
                            <input onChange={(handlerChangeInput)} placeholder='Telefono' name='phone' />
                        </Form.Field>
                        <Form.Field>
                            <label>Direccion</label>
                            <input onChange={(handlerChangeInput)} placeholder='Direccion' name='address' />
                        </Form.Field>
                    </Form>
                </div>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onclose}>
                Cancelar
                </Button>
            <Button
                content="Cargar"
                labelPosition='right'
                icon='cloud upload'
                onClick={(handlerClickOk)}
            />
        </Modal.Actions>
    </Modal>);
}
export default AddProvider;