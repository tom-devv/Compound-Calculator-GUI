import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "framer-motion";
import React from "react";
import Card from "./Card";

function OutputFields({ items, removeItems }: OutputFieldsProps) {
  const controls = useDragControls();
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          style={{ overflow: "hidden", cursor: "grab" }}
          drag="x"
          dragControls={controls}
          dragDirectionLock={true}
          dragConstraints={{ left: 1, right: 0, top: 0, bottom: 0 }}
          dragMomentum={false}
          whileTap={{ cursor: "grabbing" }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 30,
          }}
        >
          <Card
            key={items.indexOf(item)}
            entity={item}
            click={() => removeItems(item)}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default OutputFields;

export interface OutputFieldsProps {
  items: Array<any>;
  removeItems: any;
}
