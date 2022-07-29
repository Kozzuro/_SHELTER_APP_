import { Component, OnInit } from '@angular/core';
import { DogsService } from '../services/dogs.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent implements OnInit {
  constructor(private service: DogsService) {}

  public dogs = [];
  isItAll: boolean;
  pageNumber = 1;
  pageLimit = 10;

  getDogsPagination(PAGE, LIMIT) {
    if (this.isItAll === true) {
      this.service.getDogsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if(isEmptyCheck.length === 0){
          this.isItAll = false;
          console.log(false);
        }else{
          this.dogs.push(results.data.data);
          console.log(this.dogs);
        }
      });
    }
  }

  ngOnInit() {
    this.isItAll = true;
    this.getDogsPagination(this.pageNumber, this.pageLimit);
  }

  onScrollDown(ev: any) {
    if (this.isItAll === true){
      this.pageNumber++;
      this.getDogsPagination(this.pageNumber, 10);
    }else{
      return console.log("NO MORE CONTENT!");
    }
  }
}
