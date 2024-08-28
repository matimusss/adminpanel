"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import { useRef } from "react";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

// Importación dinámica del formulario para que se renderice solo en el cliente
const Form = dynamic(() => import("@formio/react").then((module) => module.Form), { ssr: false });

const FormLayout = () => {
  const formInstance = useRef(null);

  // Definición del formulario en formato JSON
  const formDefinition = {
    display: "form",
    components: [
      {
        type: "textfield",
        key: "firstName",
        label: "First Name",
        input: true,
      },
      {
        type: "textfield",
        key: "lastName",
        label: "Last Name",
        input: true,
      },
      {
        type: "button",
        key: "submit",
        label: "Submit",
        input: true
      }
    ]
  };

  const handleClick = () => {
    if (!formInstance.current) {
      console.log("El formulario no está listo aún.");
      return;
    }
    formInstance.current.getComponent('firstName')?.setValue('Juan');
    formInstance.current.getComponent('lastName')?.setValue('Pérez');
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="FormLayout" />
      {/* Renderización del formulario de Form.io */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <Form
          form={formDefinition}
          onFormReady={(instance) => {
            formInstance.current = instance;
          }}
        />
        <button onClick={handleClick} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Setear Nombres
        </button>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
