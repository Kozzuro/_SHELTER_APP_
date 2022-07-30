import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogsService } from '../services/dogs.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
})
export class DogComponent implements OnInit {
  private routeSub: Subscription;
  public dogs = [];
  public id;
  public year: string;

  constructor(private route: ActivatedRoute, private service: DogsService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getDog(this.id).subscribe((results) => {
        this.dogs.push(results.data[0]);
        let days = Math.round(moment(new Date()).diff(moment(results.data[0].birth), 'days', true));
        this.year = days.toString() + ' days';
      });
    });
  }
}
