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
  public images;

  constructor(private service: DogsService, private ApiService: ApiService) {}

  ngOnInit() {}

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files[0];
    }
  }

  onSubmit(form: NgForm) {
    let formData = new FormData();
    formData.append('file', this.images);
    formData.append('upload_preset', 'my-uploads');
    this.ApiService.postImage(formData).subscribe((results) => {
      let all = Object.assign(form.value, { images: results['secure_url'] });
      this.service.postDog(all).subscribe((response) => {
        console.log(response);
      });
    });
  }
}
