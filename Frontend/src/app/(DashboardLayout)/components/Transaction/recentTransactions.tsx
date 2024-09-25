"use client";
import React, { useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import Loading from "@/app/loading";
import { MdOutlineShoppingBag } from "react-icons/md";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';


const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${formattedDate}`;
};

const RecentTransactions = () => {
  const [activeTab, setActiveTab] = useState("all transactions");
  const [allPage, setAllPage] = useState(1);
  const [incomePage, setIncomePage] = useState(1);
  const [expensePage, setExpensePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 6; // Define how many items per page
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  // Dummy transaction data
  const allData = [
    {
      Type: "Yirgacheffe",
      BuyerName: "Abebe Kebede",
      Date: "17 May, 2024",
      Quantity: "500 kg",
      Amount: "3.9",
    },
    {
      Type: "Yirgacheffe",
      BuyerName: "Alemitu Shakiso",
      Date: "21 Jan, 2024",
      Quantity: "400 kg",
      Amount: "30.85",
    },
    {
      Type: "Yirgacheffe",
      BuyerName: "Mohamed Ali",
      Date: "18 Jan, 2024",
      Quantity: "1000 kg",
      Amount: "60.00",
    },
    {
      Type: "Yirgacheffe",
      BuyerName: "Wasihun Wondimu",
      Date: "18 Jan, 2024",
      Quantity: "1000 kg",
      Amount: "58.00",
    },
    {
      Type: "Sidamo",
      BuyerName: "Sara Mulugeta",
      Date: "19 Jan, 2024",
      Quantity: "800 kg",
      Amount: "45.50",
    },
    {
      Type: "Harrar",
      BuyerName: "Bekele Alemayehu",
      Date: "20 Feb, 2024",
      Quantity: "300 kg",
      Amount: "25.30",
    },
    {
      Type: "Limu",
      BuyerName: "Hana Demissie",
      Date: "22 Feb, 2024",
      Quantity: "900 kg",
      Amount: "50.75",
    },
    {
      Type: "Guji",
      BuyerName: "Samuel Tadesse",
      Date: "25 Mar, 2024",
      Quantity: "600 kg",
      Amount: "35.00",
    },
    {
      Type: "Gedeo",
      BuyerName: "Tigist Worku",
      Date: "30 Apr, 2024",
      Quantity: "700 kg",
      Amount: "40.10",
    },
  ];

  const incomeData = allData.filter((_, index) => index < 5); // Example filter
  const expenseData = allData.filter((_, index) => index >= 5); // Example filter

  const totalAllPages = Math.ceil(allData.length / itemsPerPage);
  const totalIncomePages = Math.ceil(incomeData.length / itemsPerPage);
  const totalExpensePages = Math.ceil(expenseData.length / itemsPerPage);

  const handlePrevPage = () => {
    if (activeTab === "all transactions" && allPage > 1) {
      setAllPage(allPage - 1);
    } else if (activeTab === "income" && incomePage > 1) {
      setIncomePage(incomePage - 1);
    } else if (activeTab === "expenses" && expensePage > 1) {
      setExpensePage(expensePage - 1);
    }
  };

  const handleNextPage = () => {
    if (activeTab === "all transactions" && allPage < totalAllPages) {
      setAllPage(allPage + 1);
    } else if (activeTab === "income" && incomePage < totalIncomePages) {
      setIncomePage(incomePage + 1);
    } else if (activeTab === "expenses" && expensePage < totalExpensePages) {
      setExpensePage(expensePage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (activeTab === "all transactions") {
      setAllPage(pageNumber);
    } else if (activeTab === "income") {
      setIncomePage(pageNumber);
    } else if (activeTab === "expenses") {
      setExpensePage(pageNumber);
    }
  };

  const determineAmountSign = (amount: number) => {
    return amount > 0 ? amount : -Math.abs(amount);
  };

  const getPagedData = (data: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderContent = () => {
    const transactions =
      activeTab === "all transactions"
        ? getPagedData(allData, allPage)
        : activeTab === "income"
        ? getPagedData(incomeData, incomePage)
        : getPagedData(expenseData, expensePage);

    return transactions.map((transaction, index) => ({
      ...transaction,
      amount: determineAmountSign(transaction.Amount),
    }));
  };

  const renderPageButtons = () => {
    const totalPages =
      activeTab === "all transactions"
        ? totalAllPages
        : activeTab === "income"
        ? totalIncomePages
        : totalExpensePages;

    const currentPage =
      activeTab === "all transactions"
        ? allPage
        : activeTab === "income"
        ? incomePage
        : expensePage;

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`py-2 px-3 sm:px-4 md:py-2 rounded-xl mx-1 
            ${
              i === currentPage
                ? "bg-[#49BEFF] text-white"
                : "bg-white text-[#49BEFF] border border-primary.main"
            }
          `}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="py-4 w-full">
      <h1 className="text-xl font-semibold mb-4 text-[#343C6A]">
        Recent Transactions
      </h1>
      <div className="border-b border-gray-200 dark:border-darkBorder flex justify-start gap-4 mb-2">
        <div
          onClick={() => setActiveTab("all transactions")}
          className={`cursor-pointer text-sm xl:text-lg ${
            activeTab === "all transactions"
              ? "text-blue-600 border-blue-600 border-b"
              : "text-[#718EBF]"
          }`}
        >
          All
        </div>
        <div
          onClick={() => setActiveTab("income")}
          className={`cursor-pointer text-sm xl:text-lg ${
            activeTab === "income"
              ? "text-blue-600 border-blue-600 border-b"
              : "text-[#718EBF] dark:text-lightText"
          }`}
        >
          Revenue
        </div>
        <div
          onClick={() => setActiveTab("expenses")}
          className={`cursor-pointer text-sm xl:text-lg  ${
            activeTab === "expenses"
              ? "text-blue-600 border-blue-600 border-b"
              : "text-[#718EBF] dark:text-lightText"
          }`}
        >
          Expenses
        </div>
      </div>
      <Box sx={{ overflow: "auto", width: { xs: "400px", sm: "auto" } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Buyer Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderContent().map((product) => (
              <TableRow key={product.BuyerName}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MdOutlineShoppingBag
                      style={{ fontSize: "24px", marginRight: "8px" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {product.Type}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.BuyerName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {product.Date}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{product.Quantity}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${product.Amount}k</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
        <div className=" w-full flex justify-center items-center mt-4">
          <div className="flex justify-center items-center p-4">
            <button
              className="cursor-pointer text-sm text-[#49BEFF] flex items-center gap-1 px-4 py-1"
              onClick={handlePrevPage}
            >
              <FaLessThan /> Previous
            </button>
            <div>{renderPageButtons()}</div>
            <button
              className="cursor-pointer text-sm text-[#49BEFF] flex items-center gap-1 px-4 py-1"
              onClick={handleNextPage}
            >
              Next <FaGreaterThan />
            </button>
          </div>
        </div>
    </div>
  );
};

export default RecentTransactions;
