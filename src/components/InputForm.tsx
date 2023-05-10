import React from "react";
import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import InputFields from "./InputFields";

import { Field } from "../types/Types";

function InputForm({ fields, title, css, submit, calculate }: TabProps) {
  return (
    <form
      className={`${css || ""} grid grid-row-col text-sm w-full`}
      onSubmit={submit}
    >
      <h1 className="font-bold w-fit text-2xl text-left py-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to bg-yellow-500">
        {title}
      </h1>
      <div className="relative border-l-2 border-red-500 left-[-20px] pl-5 pr-[-10rem] w-[42.9rem]">
        {Array.isArray(fields) && <InputFields fields={fields} />}
      </div>
      <div className="flex justify-center gap-10 mb-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className=" w-fit"
        >
           <button type="button" onClick={calculate} className="dark:text-white text-3xl bg-white dark:bg-[#151313] px-5 py-3 rounded-xl"
           >
            <h1 className=" shadow-lg">Calculate</h1>
          </button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className=" w-fit"
        >
          <button
            type="submit"
            className="dark:text-white text-3xl bg-white dark:bg-[#151313] px-5 py-3 rounded-xl"
          >
            <h1 className=" shadow-lg">Add Power</h1>
          </button>
        </motion.div>
      </div>
    </form>
  );
}

export default InputForm;

export interface TabProps {
  fields: Field[];
  title: string;
  css?: string;
  submit: any;

  calculate: any;
}
