import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'e-commerce';
  constructor(private flowbiteService: FlowbiteService,private spinner: NgxSpinnerService) {}

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
          
      console.log('Flowbite loaded', flowbite);
    });
  }
  

  OnInit(): void {
    
  


    this.spinner.show()
    setTimeout(() => {
      
      this.spinner.hide();
    }, 5000);
  
  }
}
