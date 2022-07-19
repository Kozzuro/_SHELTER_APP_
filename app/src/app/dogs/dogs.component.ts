import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService, DogModel } from '../services/api.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  constructor(private service:ApiService) {}

  dogs: DogModel[];

  ngOnInit(){
    this.service.getDogs().pipe(
      map((dogs) => dogs[0])
    );
    console.log(this.dogs)
  }
}
