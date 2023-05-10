import React from "react";
import { motion } from "framer-motion";
import { Field } from "../types/Types";

function InputFields({ fields }: InputFieldProps) {
  return (
    <>
      {fields.map((field: Field) => (
        <>
          <div className="absolute w-5 h-5 bg-red-500 rounded-full mt-[2.4rem] left-[-10.5px] border dark:border-gray-900 dark:bg-red"></div>
          <input
            placeholder={field.placeholder}
            name={field.name}
            type={"text"}
            className={
              " my-5 p-5 rounded-xl w-full shadow-lg bg-white dark:bg-[#222020] dark:caret-white dark:text-white"
            }
          ></input>
        </>
      ))}
    </>
  );
}

export default InputFields;

export interface InputFieldProps {
  fields: Field[];
}
