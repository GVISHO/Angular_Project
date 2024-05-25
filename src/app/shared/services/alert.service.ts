import { Injectable } from '@angular/core';
import { ErrorResponse } from '../interfaces/api';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert(title: string, icon: SweetAlertIcon, text = '') {
    Swal.fire({ title, icon, text });
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
