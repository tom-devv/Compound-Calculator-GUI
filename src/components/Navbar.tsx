import React from "react";

function Navbar() {
  return (
    <nav
      data-tauri-drag-region
      className=" shadow-2xl bg-[#7C8BC4] border-b-2 border-white dark:bg-black dark:border-b-0 w-fit"
    >
      <h1 className=" font-extrabold text-5xl shadow-sm py-5 mx-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to bg-yellow-500">
        Compound Calculator
      </h1>
    </nav>
  );
}

export default Navbar;
