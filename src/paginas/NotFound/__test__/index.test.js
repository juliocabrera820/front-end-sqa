import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NotFound from "./../index";
import { cleanup} from "@testing-library/react";
configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("Pruebas del componente NotFound", () => {
  test("deberia mostrar el mensaje de error", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find("h1").text()).toContain("Oops! Algo Salió Mal!");
  });
   test("deberia mostrar el boton con el texto Regresar al login", () => {
     const wrapper = shallow(<NotFound />);
     expect(wrapper.find("#boton").text()).toBe("Regresar al login");
   });
});