import { types } from "../../redux/types/types"


describe('Pruebas en types', () => { 
    test('los types deben ser iguales', () => { 
        expect(types).toMatchSnapshot()
    })
})