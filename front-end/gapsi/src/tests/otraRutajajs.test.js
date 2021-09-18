import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { OtraRutajajs } from '../pages/OtraRutajajs/OtraRutajajs';

describe('Pruebas en <OtraRutajajs />', ()=>{

    test('Se debe de mostrar <OtraRutajajs /> correctamente', () => {

        const wrapper = shallow( <OtraRutajajs />);
        expect( wrapper ).toMatchSnapshot(); 
    })

})





