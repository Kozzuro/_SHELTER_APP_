import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../services/animals.service';
import { CatsService } from '../services/cats.service';
import { DogsService } from '../services/dogs.service';

@Component({
  selector: 'app-memoryhall',
  templateUrl: './memoryhall.component.html',
  styleUrls: ['./memoryhall.component.scss'],
})
export class MemoryhallComponent implements OnInit {
  constructor(
    private dogService: DogsService,
    private catService: CatsService,
    private animalService: AnimalsService
  ) {}

  public animals = [];
  isItAllDogs: boolean;
  isItAllCats: boolean;
  isItAllAnimals: boolean;
  isItAll: boolean;
  pageNumber = 1;
  pageLimit = 10;

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getMemoryHallPagination(PAGE, LIMIT) {
    if (this.isItAllDogs === true) {
      this.dogService.getDogsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if (isEmptyCheck.length === 0) {
          this.isItAllDogs = false;
          console.log(false);
        } else {
          this.animals.push(
            results.data.data.filter((item) => item.alive !== 'true')
          );
          console.log(this.animals);
        }
      });
    }
    if (this.isItAllCats === true) {
      this.catService.getCatsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if (isEmptyCheck.length === 0) {
          this.isItAllCats = false;
          console.log(false);
        } else {
          this.animals.push(
            results.data.data.filter((item) => item.alive !== 'true')
          );
          console.log(this.animals);
        }
      });
    }
    if (this.isItAllAnimals === true) {
      this.animalService.getAnimalsPagination(PAGE, LIMIT).subscribe((results) => {
        let isEmptyCheck = [];
        isEmptyCheck = results.data.data;
        if (isEmptyCheck.length === 0) {
          this.isItAllAnimals = false;
          console.log(false);
        } else {
          this.animals.push(
            results.data.data.filter((item) => item.alive !== 'true')
          );
          console.log(this.animals);
        }
      });
    }
    if(this.isItAllDogs === false && this.isItAllCats === false && this.isItAllAnimals === false){
      this.isItAll = false;
    }
    this.shuffle(this.animals);
  }

  ngOnInit() {
    this.isItAllDogs = true;
    this.isItAllCats = true;
    this.isItAllAnimals = true;
    this.isItAll = true;
    this.getMemoryHallPagination(this.pageNumber, this.pageLimit);
  }

  onScrollDown(ev: any) {
    if (this.isItAllDogs === true || this.isItAllCats === true || this.isItAllAnimals === true) {
      this.pageNumber++;
      this.getMemoryHallPagination(this.pageNumber, 10);
    } else {
      return console.log('NO MORE CONTENT!');
    }
  }
}
