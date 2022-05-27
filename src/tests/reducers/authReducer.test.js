import { authReducer } from "../../redux/reducers/authReducer";
import { types } from "../../redux/types/types";

const initialState = {
  checking: true,
};

describe("pruebas en authReducer", () => {
  test("debe retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  test("debe hacer logout al usuario", () => {
    const stateAuthLogout = authReducer(initialState, {});
    expect(stateAuthLogout).toEqual({ checking: true });
  });
  test("debe hacer login al usuario", () => {
    const action = {
      type: types.authLogin,
      payload: { uid: 123, name: "juan" },
    };
    const stateLogin = authReducer(initialState, action);
    expect(stateLogin).toEqual({ checking: false, uid: 123, name: "juan" });
  });
});
