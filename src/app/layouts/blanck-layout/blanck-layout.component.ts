import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blanck-layout',
  imports: [RouterOutlet, NavbarComponent,FooterComponent],
  templateUrl: './blanck-layout.component.html',
  styleUrl: './blanck-layout.component.scss'
})
export class BlanckLayoutComponent {

}
