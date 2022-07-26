import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DogsService } from '../services/dogs.service';
import { ApiService } from '../services/api.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  public images = [];
  public images_url = [];

  user = '';
  newDogButton: boolean;
  uploadDogImagesButton: boolean;
  areDogImagesUploaded: boolean;

  constructor(
    private service: DogsService,
    private ApiService: ApiService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit() {
    // this.initializeUserOptions();
    this.uploadDogImagesButton = true;
    this.newDogButton = true;
  }

  // private initializeUserOptions(): void {
  //   this.user = this.keycloakService.getUsername();
  // }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.uploadDogImagesButton = false;
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
    } else {
      this.uploadDogImagesButton = true;
    }
  }

  uploadImages() {
    let formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('file', this.images[i]);
      formData.append('upload_preset', 'my-uploads');
      this.ApiService.postImage(formData).subscribe((results) => {
        this.images_url.push(results['secure_url']);
      });
    }
    this.newDogButton = true;
  }

  onSubmitNewDog(form: NgForm) {
    if (form.valid) {
      let all = Object.assign(form.value, { images: this.images_url });
      this.service.postDog(all).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
