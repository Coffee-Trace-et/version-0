import React from "react";
import { tailChase } from "ldrs";

tailChase.register();

const Loader = () => {
  return (
    <div className="">
      <l-tail-chase size="40" speed="1.75" color="#982B1C" />
    </div>
  );
};

export default Loader;
