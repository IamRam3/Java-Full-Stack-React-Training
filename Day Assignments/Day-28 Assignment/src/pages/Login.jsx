import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../services/ApiService";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setErrors }) => {
          const res = await ApiService.login(values.email, values.password);
          if (res.data.length > 0) {
            localStorage.setItem("user", JSON.stringify(res.data[0]));
            const role = res.data[0].role;
            navigate(role === "admin" ? "/admin" : "/user");
          } else {
            setErrors({ password: "Invalid credentials" });
          }
        }}
      >
        <Form>
          <div className="mb-3">
            <Field name="email" type="email" className="form-control" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <Field name="password" type="password" className="form-control" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
