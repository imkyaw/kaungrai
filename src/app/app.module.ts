import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http'
import {CdkTableModule} from '@angular/cdk/table';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule  } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { AppComponent } from './app.component'
// import { LanguageComponent } from './component/language/language.component';
import { LanguageHomeComponent } from './component/language/language-home/language-home.component';
import { LanguageCreateComponent } from './component/language/language-create/language-create.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//dialog
import { ConfirmDialog } from './dialog/confirm.dialog'

//services
import { BaseService } from './service/base.service'
import { LanguageService } from './service/language.service';
import { HomeComponent } from './component/home/home.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { ContactHomeComponent } from './component/contact/contact-home/contact-home.component';
import { ContactCreateComponent } from './component/contact/contact-create/contact-create.component';
import { ImageSetCreateComponent } from './component/image-set/image-set-create/image-set-create.component';
import { ImageSetHomeComponent } from './component/image-set/image-set-home/image-set-home.component';
import { ContentHomeComponent } from './component/content/content-home/content-home.component';
import { ContentCreateComponent } from './component/content/content-create/content-create.component';
import { ImageSetDetailComponent } from './component/image-set/image-set-detail/image-set-detail.component';
import { ContentDetailComponent } from './component/content/content-detail/content-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguageHomeComponent,
    LanguageCreateComponent,
    LoginComponent,
    HomeComponent,
    MainMenuComponent,
    ContactHomeComponent,
    ContactCreateComponent,
    ImageSetCreateComponent,
    ImageSetHomeComponent,
    ContentHomeComponent,
    ContentCreateComponent,
    ImageSetDetailComponent,

    //dialog
    ConfirmDialog,

    ContentDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule, CommonModule,
    MatFormFieldModule, CdkTableModule,
    MatOptionModule, MatDialogModule, MatCardModule,
    MatTableModule, MatInputModule, MatButtonModule, MatGridListModule, MatIconModule, MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    BaseService,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
