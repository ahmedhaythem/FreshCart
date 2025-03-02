import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';
  constructor(private flowbiteService: FlowbiteService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      
      this.spinner.hide();
    }, 5000);
  

    this.flowbiteService.loadFlowbite(flowbite => {
      
      console.log('Flowbite loaded', flowbite);
    });
  }
}
