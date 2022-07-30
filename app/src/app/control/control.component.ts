import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DogsService } from '../services/dogs.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { CatsService } from '../services/cats.service';
import { AnimalsService } from '../services/animals.service';

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

  newCatButton: boolean;
  uploadCatImagesButton: boolean;
  areCatImagesUploaded: boolean;

  newAnimalButton: boolean;
  uploadAnimalImagesButton: boolean;
  areAnimalImagesUploaded: boolean;

  constructor(
    private dogService: DogsService,
    private catService: CatsService,
    private animalService: AnimalsService,
    private ApiService: ApiService,
    private authService: AuthService
  ) {
    this.user = {};
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((success: any) => {
      this.user = success;
    });
    this.uploadDogImagesButton = true;
    this.newDogButton = true;
    
    this.uploadCatImagesButton = true;
    this.newCatButton = true;

    this.uploadAnimalImagesButton = true;
    this.newAnimalButton = true;
  }

  onDogFileSelected(event) {
    if (event.target.files.length > 0) {
      this.uploadDogImagesButton = false;
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
    } else {
      this.uploadDogImagesButton = true;
    }
  }

  uploadDogImages() {
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
    this.dogService.postDog(all).subscribe((response) => {
      console.log(response);
      this.images.length = 0;
      this.images_url.length = 0;
    });
  }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  onCatFileSelected(event) {
    if (event.target.files.length > 0) {
      this.uploadCatImagesButton = false;
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
    } else {
      this.uploadCatImagesButton = true;
    }
  }

  uploadCatImages() {
    let formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('file', this.images[i]);
      formData.append('upload_preset', 'my-uploads');
      this.ApiService.postImage(formData).subscribe((results) => {
        console.log(results);
        this.images_url.push(results['secure_url']);
      });
    }
    this.newCatButton = false;
  }

  onSubmitNewCat(form: NgForm) {
    let all = Object.assign(form.value, { images: this.images_url });
    this.catService.postCat(all).subscribe((response) => {
      console.log(response);
      this.images.length = 0;
      this.images_url.length = 0;
    });
  }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  
  onAnimalFileSelected(event) {
    if (event.target.files.length > 0) {
      this.uploadAnimalImagesButton = false;
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
    } else {
      this.uploadAnimalImagesButton = true;
    }
  }

  uploadAnimalImages() {
    let formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('file', this.images[i]);
      formData.append('upload_preset', 'my-uploads');
      this.ApiService.postImage(formData).subscribe((results) => {
        console.log(results);
        this.images_url.push(results['secure_url']);
      });
    }
    this.newAnimalButton = false;
  }

  onSubmitNewAnimal(form: NgForm) {
    let all = Object.assign(form.value, { images: this.images_url });
    this.animalService.postAnimal(all).subscribe((response) => {
      console.log(response);
      this.images.length = 0;
      this.images_url.length = 0;
    });
  }

}
