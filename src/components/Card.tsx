import React, { Dispatch, SetStateAction, useState } from "react";
import Home from "../pages/index";
import { AiFillDelete } from "react-icons/ai";
import { animate, motion } from "framer-motion";
import { entity } from "@/types/Types";

function Card({ entity, click }: CardProps) {
  return (
    <div className=" bg-white dark:bg-[#222020] dark:text-white w-3/4 h-fit drop-shadow-md m-auto rounded-md px-5 mb-5 py-2 relative">
      {/* Title & Delete*/}
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="relative float-right"
          onClick={click}
        >
          <AiFillDelete color="red" size={"1.7em"} />
        </motion.button>
      </div>

      {/* Details  */}
      <div className="mt-3 rounded-md  bg-slate-200 dark:text-white">
        {Object.entries(entity).map(([key, value]) => (
          <motion.div whileTap={{ scale: 1.1 }}>
            <div className="flex justify-between px-2 py-[0.5] border-b-2 border-black/20 dark:border-black/40 bg-slate-200 dark:bg-[#333333]">
              <p>{key}</p>
              <p>{value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Card;

export interface CardProps {
  entity: entity;
  click: any;
}
