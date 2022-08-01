import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnimalsService } from '../services/animals.service';
import * as moment from 'moment';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {
  private routeSub: Subscription;
  public animals = [];
  public id;
  public year: string;

  constructor(private route: ActivatedRoute, private service: AnimalsService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getAnimal(this.id).subscribe((results) => {
        this.animals.push(results.data[0]);
        let days = Math.round(moment(new Date()).diff(moment(results.data[0].birth), 'days', true));
        this.year = days.toString() + ' days';
      });
    });
  }
}
