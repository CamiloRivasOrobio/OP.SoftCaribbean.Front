import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaestrasComponent } from './components/maestras/maestras.component';
import { DataMaestraComponent } from './components/data-maestra/data-maestra.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PersonasFormComponent } from './components/personas/personas-form/personas-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { PacientesFormComponent } from './components/pacientes/pacientes-form/pacientes-form.component';
import { MaestrasFormComponent } from './components/maestras/maestras-form/maestras-form.component';
import { DataMaestraFormComponent } from './components/data-maestra/data-maestra-form/data-maestra-form.component';
import { DataComponent } from './components/data/data.component';
import { DescargarPdfComponent } from './components/descargar-pdf/descargar-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    MaestrasComponent,
    DataMaestraComponent,
    PersonasComponent,
    PacientesComponent,
    SpinnerLoaderComponent,
    NavBarComponent,
    PersonasFormComponent,
    PacientesFormComponent,
    MaestrasFormComponent,
    DataMaestraFormComponent,
    DataComponent,
    DescargarPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
