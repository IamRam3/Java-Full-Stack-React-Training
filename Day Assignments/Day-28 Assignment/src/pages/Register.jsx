import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../services/ApiService";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          await ApiService.register({ ...values, role: "user" });
          navigate("/login");
        }}
      >
        <Form>
          <div className="mb-3">
            <Field name="name" type="text" className="form-control" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <Field name="email" type="email" className="form-control" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <Field name="password" type="password" className="form-control" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-success">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
