"use client";
import RecentTransactions from "../../components/Transaction/recentTransactions";
import Cards from "../../components/Transaction/transactionCards";

const Transactions = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <Cards />
        <RecentTransactions />
      </div>
    </>
  );
};

export default Transactions;
