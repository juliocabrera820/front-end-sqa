import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ItemMateria from "./../index";
import { cleanup } from "@testing-library/react";
configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("Pruebas del componente ItemHorario", () => {
  test("Deberia mostrar el nombre de la materia", () => {
    const wrapper = shallow(<ItemMateria materia="Matematicas Discretas" />);
    expect(wrapper.find("#materia").text()).toBe("Matematicas Discretas");
  });
});