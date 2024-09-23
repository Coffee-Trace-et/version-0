import React from "react";
import PendingOrder from "../../components/Orders/pendingOrder";
import ApporedOrder from "../../components/Orders/aprovedOrder";

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <PendingOrder />
      <ApporedOrder />
    </div>
  );
};

export default page;
