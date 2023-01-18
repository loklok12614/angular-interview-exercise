import { Component } from '@angular/core';
import { FacadeService } from '../Services/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  hey!: string;
  constructor(private facadeService:FacadeService){

  }

  ngOnInit(): void{
  }
}
