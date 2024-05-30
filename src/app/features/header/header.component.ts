import { AsyncPipe } from '@angular/common';
import { Component, inject,OnInit } from '@angular/core';
import { BrandsService,AuthService,NavigationService } from '../../shared/services';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe,UpperCasePipe,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly brandService=inject(BrandsService)
  readonly brands$=this.brandService.getBrands()
  private readonly authService=inject(AuthService)
  profilepicture:string|undefined = ''
  readonly user = this.authService.user$.subscribe((user:User|null) =>{
    if(user){
      this.profilepicture =user.avatar
    }
  })
  private readonly navigationService= inject(NavigationService)
  readonly navigation$ = this.navigationService.navigation$
  logOut(){
    this.authService.logOut()
  }
}
