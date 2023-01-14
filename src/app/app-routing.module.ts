import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataMaestraComponent } from './components/data-maestra/data-maestra.component';
import { DataComponent } from './components/data/data.component';
import { DescargarPdfComponent } from './components/descargar-pdf/descargar-pdf.component';
import { MaestrasComponent } from './components/maestras/maestras.component';
import { PacientesFormComponent } from './components/pacientes/pacientes-form/pacientes-form.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PersonasFormComponent } from './components/personas/personas-form/personas-form.component';
import { PersonasComponent } from './components/personas/personas.component';

const routes: Routes = [
  { path: '', redirectTo: 'personas', pathMatch: 'full' },
  { path: 'personas', component: PersonasComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'maestras', component: DataComponent },
  { path: 'reporte/:id', component: PacientesComponent },
  { path: 'prueba/:id', component: DescargarPdfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
