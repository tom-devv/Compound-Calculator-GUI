import React from "react";
import { motion } from "framer-motion";

function Button({ content, style }: Button) {
  return (
    <motion.button
      className={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {content}
    </motion.button>
  );
}

export default Button;

export interface Button {
  content: any;
  style?: string;
}
