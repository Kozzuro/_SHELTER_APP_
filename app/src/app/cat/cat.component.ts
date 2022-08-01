import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatsService } from '../services/cats.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit {
  private routeSub: Subscription;
  public cats = [];
  public id;
  public year: string;

  constructor(private route: ActivatedRoute, private service: CatsService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getCat(this.id).subscribe((results) => {
        this.cats.push(results.data[0]);
        let days = Math.round(moment(new Date()).diff(moment(results.data[0].birth), 'days', true));
        this.year = days.toString() + ' days';
      });
    });
  }
}
