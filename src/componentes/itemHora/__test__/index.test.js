import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ItemHora from "./../index";
import { cleanup } from "@testing-library/react";
configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("Pruebas del componente ItemHora", () => {
  const aulas = [
    { Clv_Aula: "CC1" },
    { Clv_Aula: "CC2" },
    { Clv_Aula: "CC3" },
    { Clv_Aula: "CC4" },
    { Clv_Aula: "CC5" },
    { Clv_Aula: "CC6" },
  ];
  test("deberia mostrar el dia", () => {
    const wrapper = shallow(
      <ItemHora dia={"Lunes"} hi="10" hf="12" mi="00" mf="0" aulas={aulas} />
    );
    expect(wrapper.find("#dia").text()).toBe("Lunes");
  });
  test("deberia mostrar un label con el texto Aula", () => {
    const aulas = [
      { Clv_Aula: "CC1" },
      { Clv_Aula: "CC2" },
      { Clv_Aula: "CC3" },
      { Clv_Aula: "CC4" },
      { Clv_Aula: "CC5" },
      { Clv_Aula: "CC6" },
    ];
    const wrapper = shallow(
      <ItemHora dia="Lunes" hi="10" hf="12" mi="00" mf="0" aulas={aulas} />
    );
    expect(wrapper.find("#aula").text()).toContain("Aula");
  });
  test("deberia mostrar un label con el texto Hora inicio", () => {
    const aulas = [
      { Clv_Aula: "CC1" },
      { Clv_Aula: "CC2" },
      { Clv_Aula: "CC3" },
      { Clv_Aula: "CC4" },
      { Clv_Aula: "CC5" },
      { Clv_Aula: "CC6" },
    ];
    const wrapper = shallow(
      <ItemHora dia="Lunes" hi="10" hf="12" mi="00" mf="0" aulas={aulas} />
    );
    expect(wrapper.find("#hrInicio").text()).toContain("Hora Inicio");
  });
  test("deberia mostrar el mensaje de selecionar un salon", () => {
    const aulas = [
      { Clv_Aula: "CC1" },
      { Clv_Aula: "CC2" },
      { Clv_Aula: "CC3" },
      { Clv_Aula: "CC4" },
      { Clv_Aula: "CC5" },
      { Clv_Aula: "CC6" },
    ];
    const wrapper = shallow(
      <ItemHora dia="Lunes" hi="10" hf="12" mi="00" mf="0" aulas={aulas} />
    );
    expect(wrapper.find("#msjSeleccionar").text()).toContain(
      "Selecciona un salón"
    );
  });
    test("deberia mostrar un label con el texto Hora Final", () => {
      const aulas = [
        { Clv_Aula: "CC1" },
        { Clv_Aula: "CC2" },
        { Clv_Aula: "CC3" },
        { Clv_Aula: "CC4" },
        { Clv_Aula: "CC5" },
        { Clv_Aula: "CC6" },
      ];
      const wrapper = shallow(
        <ItemHora dia="Lunes" hi="10" hf="12" mi="00" mf="0" aulas={aulas} />
      );
      expect(wrapper.find("#hrFinal").text()).toContain("Hora Final");
    });
});
