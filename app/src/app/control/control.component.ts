import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DogsService } from '../services/dogs.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  public images = [];
  public images_url = [];

  constructor(private service: DogsService, private ApiService: ApiService) {}

  ngOnInit() {}

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
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
  }

  onSubmit(form: NgForm) {
    let all = Object.assign(form.value, { images: this.images_url });
    this.service.postDog(all).subscribe((response) => {
      console.log(response);
    });
  }
}
