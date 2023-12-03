import swal from 'sweetalert2';

export function showNotifySuccess(title: string, message: string) {
  return swal({
    position: 'bottom-right',
    timer: 2500,
    type: 'success',
    titleText: title,
    text: message,
    showCloseButton: false,
    showConfirmButton: false,
  }).catch(swal.noop);
}

export function showNotifyWarning(title: string, message: string) {
  return swal({
    position: 'bottom-right',
    timer: 2500,
    type: 'warning',
    titleText: title,
    text: message,
    showCloseButton: false,
    showConfirmButton: false,
  }).catch(swal.noop);
}

export function showNotifyError(title: string, message: string) {
  return swal({
    position: 'bottom-right',
    timer: 2500,
    type: 'error',
    titleText: title,
    text: message,
    showCloseButton: false,
    showConfirmButton: false,
  }).catch(swal.noop);
}

export function showSwalSuccess(
  title = 'Error al realizar la solicitud',
  message: string
) {
  return swal({
    type: 'success',
    titleText: title,
    text: message,
    showCloseButton: true,
  }).catch(swal.noop);
}

export function showSwalError(
  title = 'Error al realizar la solicitud',
  message: string
) {
  return swal({
    type: 'error',
    titleText: title,
    text: message,
    showCloseButton: true,
  }).catch(swal.noop);
}

export function showSwalWarning(
  title = 'Error al realizar la solicitud',
  message: string
) {
  return swal({
    type: 'warning',
    titleText: title,
    text: message,
    showCloseButton: true,
  }).catch(swal.noop);
}

export function showSwalInfo(
  title = 'Error al realizar la solicitud',
  message: string
) {
  return swal({
    type: 'info',
    titleText: title,
    text: message,
    showCloseButton: true,
  }).catch(swal.noop);
}

export function showModalConfirmation(title: string, message: string, confirmButtonText = 'Confirmar', cancelButtonText = 'Cancelar') {
  return swal({
    type: 'question',
    titleText: title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#ED2C3E',
    cancelButtonColor: '#808080',
    confirmButtonText,
    cancelButtonText,
  }).catch(swal.noop);
}
