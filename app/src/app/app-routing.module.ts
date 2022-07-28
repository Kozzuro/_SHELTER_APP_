import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimalComponent } from './animal/animal.component';
import { AnimalsComponent } from './animals/animals.component';
import { CatComponent } from './cat/cat.component';
import { CatsComponent } from './cats/cats.component';
import { ContactComponent } from './contact/contact.component';
import { ControlComponent } from './control/control.component';
import { DogComponent } from './dog/dog.component';
import { DogsComponent } from './dogs/dogs.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { MemoryhallComponent } from './memoryhall/memoryhall.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'animals', component: AnimalsComponent },
  { path: 'animal/:id', component: AnimalComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'cat/:id', component: CatComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'dog/:id', component: DogComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'control', component: ControlComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'memoryhall', component: MemoryhallComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'volunteering', component: VolunteeringComponent },
  { path: 'signIn', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }