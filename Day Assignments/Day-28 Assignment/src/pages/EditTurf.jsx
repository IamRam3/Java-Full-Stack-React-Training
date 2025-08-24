import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ApiService } from "../services/ApiService";

export default function EditTurf() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    location: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    if (id) {
      ApiService.getTurfs().then(res => {
        const turf = res.data.find(t => t.id === Number(id));
        if (turf) setInitialValues(turf);
      });
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Turf" : "Add Turf"}</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required(),
          location: Yup.string().required(),
          price: Yup.number().required(),
          description: Yup.string().required()
        })}
        onSubmit={async (values) => {
          if (id) {
            await ApiService.updateTurf(id, values);
          } else {
            await ApiService.addTurf(values);
          }
          navigate("/admin");
        }}
      >
        <Form>
          <div className="mb-3">
            <Field name="title" className="form-control" placeholder="Title" />
            <ErrorMessage name="title" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <Field name="location" className="form-control" placeholder="Location" />
            <ErrorMessage name="location" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <Field name="price" type="number" className="form-control" placeholder="Price" />
            <ErrorMessage name="price" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <Field name="description" className="form-control" placeholder="Description" />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>
          <button className="btn btn-success" type="submit">{id ? "Update" : "Add"} Turf</button>
        </Form>
      </Formik>
    </div>
  );
}
