import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBusqueda'
})
export class FilterBusquedaPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    if (arg === '' || arg.length < 3) { return value; }
    const resultTurnos = [];
    for (const turno of value) {
      if (turno.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultTurnos.push(turno);
      }
    }
  }
}

