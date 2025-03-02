import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/cart';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryList:Category[]=[]
  constructor(private categories:CategoriesService){}

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    return this.categories.getCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.categoryList=res.data
        console.log(this.categories);
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
