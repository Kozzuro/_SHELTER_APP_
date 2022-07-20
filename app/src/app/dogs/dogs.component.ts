import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent implements OnInit {
  constructor(private service: ApiService) {}

  public dogs = [];

  getAll() {
    this.service.getDogs().subscribe((results) => {
      this.dogs = results.data;
    });
  }

  ngOnInit() {
    this.getAll();
  }
  
}
