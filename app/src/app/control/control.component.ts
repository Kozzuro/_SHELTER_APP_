import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DogsService } from '../services/dogs.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  public images = [];
  public images_url = [];

  user: any;
  newDogButton: boolean;
  uploadDogImagesButton: boolean;
  areDogImagesUploaded: boolean;

  constructor(private service: DogsService, private ApiService: ApiService, private authService: AuthService) {
    this.user = {};
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((success: any) => {
      this.user = success;
    });
    this.uploadDogImagesButton = true;
    this.newDogButton = true;
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
        console.log(results);
        this.images_url.push(results['secure_url']);
      });
    }
    this.newDogButton = false;
  }
  
  onSubmitNewDog(form: NgForm) {
    let all = Object.assign(form.value, { images: this.images_url });
    this.service.postDog(all).subscribe((response) => {
      console.log(response);
      this.images.length = 0;
      this.images_url.length = 0;
    });
  }
}
