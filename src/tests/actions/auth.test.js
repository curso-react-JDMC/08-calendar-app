import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { startLogin } from "../../redux/actions/auth";
import { types } from "../../redux/types/types";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
Storage.prototype.setItem = jest.fn();


jest.mock('sweetalert2',()=>{
    fire: jest.fn()
});

describe("pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("startLogin Correcto", async () => {
    await store.dispatch(startLogin("juan2@correo.com", "123456"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token",expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith("token-init-date", expect.any(Number));
    //para saber la informacion del token usado
    //console.log(localStorage.setItem.mock.calls)
  });

  test('login incorrecto', async() => { 
    await store.dispatch(startLogin("juan2@correo.com", "1234567"));

    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith({})
  })
});
