import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loader from "@/app/(DashboardLayout)/components/Loder/Loder";

interface Transaction {
  id: string;
  amount: number; // Ensure this is a number
  description: string;
  order_id: string;
  farmer_id: string;
  farmer_name: string;
  merchant_id: string;
  merchant_name: string;
  quantity: number;
  total_price: number; // Adding total_price to interface
  datetime: string;
}

function formatDate(dateString: string): string {
  const datePart = dateString.split(" ")[0];
  const date = new Date(datePart);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

const ProductPerformance = () => {
  const [products, setProducts] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const route =
    session?.data?.user.role === "farmer"
      ? "farmer"
      : session?.data?.user.role === "merchant"
      ? "Buyer"
      : "Admin";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://cofeetracebackend-2.onrender.com/api/v0/transaction/getmytransactions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.data?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        // Assuming the response contains an array of transactions
        // console.log("datatttttttttaaaaaaa",data.data)
        setProducts(data.data?.slice(0, Math.min(data.data?.length, 5))); // Take the first 5 transactions
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [session]);

  return (
    <DashboardCard title="Recent Transactions">
      <Box>
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
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
                    Transaction ID
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
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Total Price
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {!(loading || session.status === "loading") ? (
              <TableBody>
                {products?.map((transaction: Transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <MdOutlineShoppingBag
                          style={{ fontSize: "24px", marginRight: "8px" }}
                        />
                        <Typography variant="subtitle2">
                          {transaction.id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {transaction.merchant_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2">
                        {formatDate(transaction.datetime)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {transaction.quantity} kg
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        ${transaction.amount} k
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        ${transaction.total_price} k
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div className="flex item-center justify-center mt-10">
                <Loader />;
              </div>
            )}
          </Table>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            marginTop: "10px",
          }}
        >
          <Link href={`/${route}/Transactions`}>
            <Box
              sx={{
                padding: "10px 20px",
                backgroundColor: [primary],
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Load More
            </Box>
          </Link>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
