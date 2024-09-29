"use client";
import RecentTransactions from "../../components/Transaction/recentTransactions";
import Cards from "../../components/Transaction/transactionCards";
import { useState } from "react";

const Transactions = () => {

  const [  TotalEarnings,setTotalEarnings] = useState(0)
  const [  TotalAmount,setTotalAmount] = useState(0)
  return (
    <>
      <div className="flex flex-col gap-8">
        <Cards earlning = {TotalEarnings} expense = {TotalAmount} />
        <RecentTransactions setTotalEarnings = {setTotalEarnings} setTotalAmount = {setTotalAmount} />
      </div>
    </>
  );
};

export default Transactions;
