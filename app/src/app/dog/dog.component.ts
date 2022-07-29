import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogsService } from '../services/dogs.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
})
export class DogComponent implements OnInit {

  private routeSub: Subscription;
  public dogs = [];
  public id;

  constructor(private route: ActivatedRoute, private service: DogsService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getDog(this.id).subscribe((results) => {
        this.dogs.push(results.data[0]);
        console.log(results.data[0])
      });
    });
  }

}
