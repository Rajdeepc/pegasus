import React from "react";
import { Toast } from "react-bootstrap";

export default function ToastComponent({ text }) {
  return (
    
      <Toast.Body className="text-center">{text}</Toast.Body>
  );
}
