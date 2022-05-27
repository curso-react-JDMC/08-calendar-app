import { uiCloseModal, uiOpenModal } from "../../redux/actions/ui";
import { uiReducer } from "../../redux/reducers/uiReducer"

const initialState = {
    modalOpen: false,
}


describe('pruebas en uiReducer', () => { 

    test('debe retornar el estado por defecto', () => { 
        const state = uiReducer(initialState,{});
        expect(state).toEqual(initialState);
    });

    test('debe abrir y cerrar el modal', () => { 
         const modalOpen = uiOpenModal();
         const state = uiReducer(initialState,modalOpen)
         expect(state).toEqual({modalOpen:true});
         const modalClose =  uiCloseModal(); 
         const stateClose = uiReducer(initialState,modalClose)
         expect(stateClose).toEqual({modalOpen:false});
    })
})