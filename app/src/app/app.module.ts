import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  KeycloakAngularModule,
  KeycloakBearerInterceptor,
  KeycloakService,
} from 'keycloak-angular';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DogsComponent } from './dogs/dogs.component';
import { CatsComponent } from './cats/cats.component';
import { AnimalsComponent } from './animals/animals.component';
import { DogComponent } from './dog/dog.component';
import { CatComponent } from './cat/cat.component';
import { AnimalComponent } from './animal/animal.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ControlComponent } from './control/control.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import { MemoryhallComponent } from './memoryhall/memoryhall.component';
import { AuthGuard } from './auth.guard';

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'angular_test',
        clientId: 'angular_app',
      },
      bearerExcludedUrls: ['https://api.cloudinary.com/v1_1/kozzuro/image/upload', '/clients/public'],
      bearerPrefix: 'Bearer',
      enableBearerInterceptor: true,
      initOptions: {
        // onLoad: 'login-required',
        // checkLoginIframe: true,
        // checkLoginIframeInterval: 1000,
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DogsComponent,
    CatsComponent,
    AnimalsComponent,
    DogComponent,
    CatComponent,
    AnimalComponent,
    GalleryComponent,
    ControlComponent,
    NotfoundComponent,
    HomeComponent,
    ContactComponent,
    VolunteeringComponent,
    MemoryhallComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
