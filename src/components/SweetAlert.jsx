import React from "react";
const Swal = require("sweetalert2");
const SweetAlert = ({ icon, message }) => {
  console.log(icon, message);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon,
    title: message,
  });
};

export default SweetAlert;
