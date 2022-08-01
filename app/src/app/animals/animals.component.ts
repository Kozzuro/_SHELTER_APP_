import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
})
export class AnimalsComponent implements OnInit {
  constructor(private animalsService: AnimalsService) {}

  public animals = [];
  isItAll: boolean;
  pageNumber = 1;
  pageLimit = 10;

  getAnimalsPagination(PAGE, LIMIT) {
    if (this.isItAll === true) {
      this.animalsService.getAnimalsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if(isEmptyCheck.length === 0){
          this.isItAll = false;
          console.log(false);
        }else{
          this.animals.push(results.data.data.filter(item => item.alive !== 'false'));
          console.log(this.animals);
        }
      });
    }
  }

  ngOnInit() {
    this.isItAll = true;
    this.getAnimalsPagination(this.pageNumber, this.pageLimit);
  }

  onScrollDown(ev: any) {
    if (this.isItAll === true){
      this.pageNumber++;
      this.getAnimalsPagination(this.pageNumber, 10);
    }else{
      return console.log("NO MORE CONTENT!");
    }
  }
}
