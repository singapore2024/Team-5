import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

// price, desc, status, cust_m

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    description: "",
    email: "",
    price: "",
    deliveryDateTime: "",
    qty: "",
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
