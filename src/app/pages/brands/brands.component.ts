import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/brand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brandList:Brand[]=[]
  constructor(private brand:BrandsService){}

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands(){
    this.brand.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.brandList=res.data
        console.log(this.brandList);
        
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
