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
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { MdOutlineShoppingBag } from "react-icons/md";

const products = [
  {
    Type: "Yirgacheffe",
    BuyerName: "Abebe Kebede",
    Date: "17 May, 2024",
    Quantity: "500 kg",
    budget: "3.9",
  },
  {
    Type: "Yirgacheffe",
    BuyerName: "Alemitu Shakiso",
    Date: "21 Jan,2024",
    Quantity: "400 kg",
    budget: "30.85",
  },
  {
    Type: "Yirgacheffe",
    BuyerName: "Mohamed Ali",
    Date: "18 Jan,2024",
    Quantity: "1000 kg",
    budget: "60.00",
  },
  {
    Type: "Yirgacheffe",
    BuyerName: "Wasihun Wondimu",
    Date: "18 Jan,2024",
    Quantity: "1000 kg",
    budget: "58.00",
  },
];

const ProductPerformance = () => {
  return (
    <DashboardCard title="Recent Transaction">
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
                <Typography variant="subtitle2" fontWeight={800}>
                  Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={800}>
                  Buyer Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={800}>
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={800}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={800}>
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
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
                      {/* <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography> */}
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
                  <Typography variant="h6">${product.budget}k</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
          <Box
          sx={{
            padding: "10px 20px",
            backgroundColor: "#A67B5B",
            color: "white",
            borderRadius: "5px",
          }}
          >
            Load More
          </Box>
        </Box>
        </Box>

    </DashboardCard>
  );
};

export default ProductPerformance;
