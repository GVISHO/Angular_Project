import { Injectable, inject } from '@angular/core';
import { ErrorResponse } from '../interfaces/api';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly profileService = inject(ProfileService)
 
  alert(title: string, icon: SweetAlertIcon, text = '') {
    Swal.fire({ title, icon, text });
  }
  deleteAccount(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteAccount().subscribe()
        
      }
    });
  }
  toast(
    title: string,
    icon: SweetAlertIcon,
    color: string,
    time: number = 1500,
  ): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: color,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    Toast.fire({
      icon,
      title,
    });
  }

  error(response: ErrorResponse) {
    console.log(response)
    Swal.fire({
      title: response.error,
      icon: 'error',
      html: `<ul style="list-style: none; padding: 0">${new Array(
        response.errorKeys.length,
      )
        .fill(0)
        .map((_, index) => `<li>${response.errorKeys[index]}</li>`)
        .join('')}</ul>`,
    });
  }
}
