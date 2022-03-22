import Swal from "sweetalert2"

//icons = 'success' , 'error', 'info'
export const fireAlert = (title, body, icon) => {
  Swal.fire(
    title,
    body,
    icon
  )
}

