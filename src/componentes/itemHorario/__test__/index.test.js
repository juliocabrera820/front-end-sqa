import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ItemHorario from "./../index";
import { cleanup } from "@testing-library/react";
configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("Pruebas del componente ItemHora", () => {
  test("No deberia renderizar el componente ItemHora", () => {
    const wrapper = shallow(<ItemHorario hora="" aula="" />);
    expect(wrapper.first().type()).toEqual("div");
  });
  test("Deberia renderizar el componente ItemHorario con todas sus propiedades", () => {
    const wrapper = shallow(
      <ItemHorario
        hora="13:00:00"
        aula="CC1"
        profesor="Carlos Benito Mojica Ruiz"
      />
    );
    expect(wrapper.find("#hora").text()).toBe("13:00:00");
    expect(wrapper.find("#aula").text()).toBe("Aula: CC1");
    expect(wrapper.find("#maestro").text()).toBe(
      "Maestro: Carlos Benito Mojica Ruiz"
    );
  });
});
