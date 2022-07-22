import { Component, OnInit } from '@angular/core';
import { DogsService } from '../services/dogs.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private service: DogsService) {}

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
