import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DogsService } from '../services/dogs.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { CatsService } from '../services/cats.service';
import { AnimalsService } from '../services/animals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  public images = [];
  public images_url = [];

  public allDogs = [];
  public allCats = [];
  public allAnimals = [];

  isItAllDogs: boolean;
  isItAllCats: boolean;
  isItAllAnimals: boolean;

  pageNumber = 1;
  pageLimit = 5;

  microchipDogNumberEdit: string;
  textareaDogEdit: string;
  newDogChecked: boolean;
  dogUpdateCheckBox: boolean;
  dogId: string;
  dogOldBody = [];

  previousDogsButton: boolean;
  nextDogsButton: boolean;

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

    this.isItAllDogs = true;

    this.previousDogsButton = true;
    this.nextDogsButton = false;

    this.getDogsPagination(this.pageNumber, this.pageLimit);
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
    if(form.value.alive === ''){ form.value.alive = 'false' };
    console.log(form.value.alive);
    let all = Object.assign(form.value, { images: this.images_url });
    this.dogService.postDog(all).subscribe((response) => {
      console.log(response);
      this.images.length = 0;
      this.images_url.length = 0;
    });
  }

  getDogsPagination(PAGE, LIMIT) {
    if (this.isItAllDogs === true) {
      this.dogService.getDogsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if(isEmptyCheck.length < 5){
          this.nextDogsButton = true;
        }else{
          this.nextDogsButton = false;
        }
        if (isEmptyCheck.length === 0) {
          this.isItAllDogs = false;
          this.nextDogsButton = true;
        } else {
          this.allDogs.push(results.data.data);
        }
      });
    }
  }

  previousDogs() {
    console.log('previous');
    if (this.isItAllDogs === true) {
      this.pageNumber--;
      this.allDogs.length = 0;
      this.getDogsPagination(this.pageNumber, this.pageLimit);
    } else {
      this.getDogsPagination(this.pageNumber--, this.pageLimit);
    }
    if(this.pageNumber == 1){
      this.previousDogsButton = true;
    }
  }

  nextDogs() {
    if (this.isItAllDogs === true) {
      this.pageNumber++;
      this.allDogs.length = 0;
      this.getDogsPagination(this.pageNumber, this.pageLimit);
      this.previousDogsButton = false;
    } else {
      return;
    }
  }

  checkDog(image) {
    Swal.fire({
      imageUrl: image,
    });
  }

  editDog(id, microchipNumber, textareaContent, aliveCheckbox, oldBody) {
    this.microchipDogNumberEdit = microchipNumber;
    this.textareaDogEdit = textareaContent;
    if (aliveCheckbox === 'true') {
      this.dogUpdateCheckBox = true;
    } else {
      this.dogUpdateCheckBox = false;
    }
    this.dogOldBody = oldBody;
    this.dogId = id;
  }

  onSubmitUpdateDog(form: NgForm) {
    Swal.fire({
      title: 'Do you want to update?',
      showCancelButton: true,
      confirmButtonText: 'Update!',
      denyButtonText: `Don't update`,
    }).then((result) => {
      if (result.isConfirmed) {
        let all = Object.assign(form.value, {
          microchip: form.value.microchip,
          description: form.value.description,
          alive: form.value.alive
        });
        this.dogService.updateDog(this.dogId, all).subscribe((response) => {
          Swal.fire('Updated!', '', 'success').then(() => {
            this.allDogs.length = 0;
            this.getDogsPagination(this.pageNumber, this.pageLimit);
          });
        });
      } else if (result.isDenied) {
        Swal.fire('Not updated!', '', 'info');
      }
    });
  }

  deleteDog(id) {
    Swal.fire({
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete!',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dogService.deleteDog(id).subscribe(() => {
          Swal.fire('Deleted!', '', 'success').then(() => {
            this.allDogs.length = 0;
            this.getDogsPagination(this.pageNumber, this.pageLimit);
          });
        });
      } else if (result.isDenied) {
        Swal.fire('Not deleted!', '', 'info');
      }
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
