import Swal, { SweetAlertIcon } from 'sweetalert2';

export class AlertService {
  static fire(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'info',
    timer: number = 3000,
    width: string = '600px'
  ) {
    const hasLineBreaks = text.includes('\n');

    return Swal.fire({
      title,
      icon,
      width,
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      allowOutsideClick: false,
      html: hasLineBreaks ? text.replace(/\n/g, '<br>') : undefined,
      text: hasLineBreaks ? undefined : text
    });
  }
}
