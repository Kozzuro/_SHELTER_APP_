import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DogsService } from '../services/dogs.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private service: DogsService, private ApiService: ApiService ) {}

  public dogs = [];

  getAll() {
    this.service.getDogs().subscribe((results) => {
      this.dogs = results.data;
    });
  }

  ngOnInit() {
    this.getAll();
    this.ApiService.postImage('../../assets/home/dog_blob.png').subscribe((results) => {
      console.log(results);
    });
  }

  onSubmit(form: NgForm) {
    // this.service.postDog(form.value).subscribe((response) => {
    //   console.log(response);
    // });
    console.log(form.value.images);
 }

}
