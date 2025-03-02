import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchTerm:string): Product[] {
    return products.filter((products)=>products.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
