import Mantenimiento from "../src/estados/mantenimiento";
import Estado from "../src/estados/estado";

describe('Test Clase Mantenimiento',()=>{
    let mantenimiento: Mantenimiento;
    
    beforeEach(() => {
      mantenimiento = new Mantenimiento();
    });

    it('debe ser una instancia de Mantenimiento',()=>{
      expect(mantenimiento).toBeInstanceOf(Mantenimiento);
    })

    it('debe ser una instancia de su clase base Estado',()=>{
      expect(mantenimiento).toBeInstanceOf(Estado);
    })

    it('debe devolver el tipo de estado "Mantenimiento"', () => {
      expect(mantenimiento.getTipoEstado()).toBe("Mantenimiento");
    });

    it('debería permitir cambiar el tipo de estado mediante setTipoEstado', () => {
      mantenimiento.setTipoEstado("Alquilado");
      expect(mantenimiento.getTipoEstado()).toBe("Alquilado");
    });

})