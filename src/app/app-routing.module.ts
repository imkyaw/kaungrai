import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component'
import { LanguageHomeComponent } from './component/language/language-home/language-home.component'
import { HomeComponent } from './component/home/home.component'
import { LanguageCreateComponent } from './component/language/language-create/language-create.component'
import { ContactCreateComponent } from './component/contact/contact-create/contact-create.component'
import { ContactHomeComponent } from './component/contact/contact-home/contact-home.component'
// import { Cont } from './component/content/'
import { ImageSetHomeComponent } from './component/image-set/image-set-home/image-set-home.component'
import { ImageSetDetailComponent } from './component/image-set/image-set-detail/image-set-detail.component'
import { ImageSetCreateComponent } from './component/image-set/image-set-create/image-set-create.component'
import { ContentCreateComponent } from './component/content/content-create/content-create.component'
import { ContentHomeComponent } from './component/content/content-home/content-home.component'
import { ContentDetailComponent } from './component/content/content-detail/content-detail.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'language', component: LanguageHomeComponent },
  { path: 'language/create', component: LanguageCreateComponent },
  { path: 'contact', component: ContactHomeComponent },
  { path: 'contact/create', component: ContactCreateComponent },
  { path: 'imageset', component: ImageSetHomeComponent },
  { path: 'imageset/create', component: ImageSetCreateComponent },
  { path: 'imageset/:id', component: ImageSetDetailComponent },
  { path: 'content', component: ContentHomeComponent},
  { path: 'content/create', component: ContentCreateComponent},
  { path: 'content/:id', component: ContentDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
