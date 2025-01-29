import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Tarea } from '../interface/tarea';
import { UtilidadesService } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private readonly key = 'tareas';

  constructor(private utilidadesService: UtilidadesService) { }

  /**
   * Listar tareas
   * @returns Tarea[]
   */
  async listarTareas(): Promise<Tarea[]> {
    const { value } = await Preferences.get({ key: this.key });

    if(value) {
      return JSON.parse(value);
    } else {
      return [];}
  }

  async obtenerTarea(id: string): Promise<Tarea | null> {
    const tareas = await this.listarTareas();
    const tarea = tareas.find(tarea => tarea.id === id);
    if(tarea === undefined) {
      return null;
    } else {
      return tarea
    }
  }

  /**
   * Guardar tarea
   * @param tarea Tarea
   */
  async guardarTarea(tarea: Tarea): Promise<void> {
    const tareas = await this.listarTareas();
    tareas.push(tarea);
    await Preferences.set({ key: this.key, value: JSON.stringify(tareas) });
  }

  /**
   * Eliminar tarea
   * @param id string
   */
  async eliminarTarea(id: string): Promise<void> {
    let tareas = await this.listarTareas();

    tareas = tareas.filter(tarea => tarea.id !== id);
    await Preferences.set({ key: this.key, value: JSON.stringify(tareas) });
  }

  /**
   * Actualizar tarea
   * @param tarea Tarea
   */

  async actualizarTarea(tarea: Tarea): Promise<void> {
    let tareas = await this.listarTareas();
    tareas = tareas.map(t => t.id === tarea.id ? tarea : t);
    await Preferences.set({ key: this.key, value: JSON.stringify(tareas) });
  }

}
