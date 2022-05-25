import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import {
  startChecking,
  startLogin,
  startRegister,
} from "../../redux/actions/auth";
import { types } from "../../redux/types/types";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
Storage.prototype.setItem = jest.fn();

let token = "";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

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

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
    //para saber la informacion del token usado
    //console.log(localStorage.setItem.mock.calls)
    token = localStorage.setItem.mock.calls[0][1];
  });

  test("login incorrecto", async () => {
    await store.dispatch(startLogin("juan2@correo.com", "1234567"));

    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Wrong email or password",
      "error"
    );
    await store.dispatch(startLogin("juan2@correo.com", "123456789"));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Wrong email or password",
      "error"
    );
  });

  test("startRegister correcto", async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "carlos",
          token: "qwerty",
        };
      },
    }));

    await store.dispatch(startRegister("test@correo.com", "123456", "test"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "[auth] Login",
      payload: { uid: 123, name: "carlos" },
    });

    expect(localStorage.setItem).toBeCalledWith("token", "qwerty");
    expect(localStorage.setItem).toBeCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "carlos",
          token: "qwerty",
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "[auth] Checking finish login state",
      payload: {
        name: "carlos",
        uid: 123,
      },
      type: "[auth] Login",
    });
    expect(localStorage.setItem).toBeCalledWith('token',expect.any(String))
  });
});
