import { DeleteEventFab } from "../../components/ui/DeleteEventFab";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import * as userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = { activeEvent: false };
const store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: () => ({ activeEvent: true }),
  useDispatch: jest.fn(),
}));

// const wrapper = mount(
//   <Provider store={store}>
//     <DeleteEventFab/>
//   </Provider>
// );

describe("Pruebas en <DeleteEventFab/>", () => {
  test("debe mostrarse correctamente", () => {
    //expect(wrapper).toMatchSnapshot();
    render(
        <DeleteEventFab />
    );
    expect(render).toMatchSnapshot();
  });
//   test('debe llamar eventStartDelete', async() => { 
//     const user = userEvent.setup()
//     render(
//         <DeleteEventFab />
//     );
//     expect(screen.getByRole('button')).toHaveTextContent("Borrar Evento");
//     await user.click(screen.getByRole('button'));
//   })
});
