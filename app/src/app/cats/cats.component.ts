import { Component, OnInit } from '@angular/core';
import { CatsService } from '../services/cats.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent implements OnInit {
  constructor(private catsService: CatsService) {}

  public cats = [];
  isItAll: boolean;
  pageNumber = 1;
  pageLimit = 10;

  getcatsPagination(PAGE, LIMIT) {
    if (this.isItAll === true) {
      this.catsService.getCatsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if(isEmptyCheck.length === 0){
          this.isItAll = false;
          console.log(false);
        }else{
          this.cats.push(results.data.data.filter(item => item.alive !== 'false'));
          console.log(this.cats);
        }
      });
    }
  }

  ngOnInit() {
    this.isItAll = true;
    this.getcatsPagination(this.pageNumber, this.pageLimit);
  }

  onScrollDown(ev: any) {
    if (this.isItAll === true){
      this.pageNumber++;
      this.getcatsPagination(this.pageNumber, 10);
    }else{
      return console.log("NO MORE CONTENT!");
    }
  }
}
