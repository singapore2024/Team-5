import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Select, MenuItem, FormControl
} from '@mui/material';  // Import MUI components
import axios from "axios";

// AdminDashboard Component with Dropdown to select Orders or Inventory
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [view, setView] = useState('orders');  // State to toggle between 'orders' and 'inventory'
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/view');  // API call
        setInventory(response.data);  // Assuming response.data contains inventory data
        setLoading(false);  // Set loading to false once data is fetched
        console.log(response.data);
        setStatus(response.data.status);
      } catch (err) {
        console.error('Error fetching inventory data:', err);
        // setError("Error fetching data");
        // setLoading(false);
      }
    };
    fetchInventoryData();
  }, []);

  useEffect(() => {
    // Mock orders data
    const mockOrders = [
      { id: 1, customer: "Alice", status: "Pending", items: 3, orderDate: "xx" },
      { id: 2, customer: "Bob", status: "Fulfilled", items: 5, orderDate: "xx" },
      { id: 3, customer: "Charlie", status: "Cancelled", items: 2, orderDate: "xx" }
    ];

    // Mock inventory data
    const mockInventory = [
      { id: 1, itemName: "Rice", stock: 100, status: "In Stock", deliveryDate: "xx" },
      { id: 2, itemName: "Chicken", stock: 50, status: "Low Stock", deliveryDate: "xx" },
      { id: 3, itemName: "Vegetables", stock: 0, status: "Out of Stock", deliveryDate: "xx" }
    ];

    setOrders(mockOrders);
    // setInventory(mockInventory);
  }, []);

  // Handle the dropdown change
  const handleChange = (event) => {
    setView(event.target.value);  // Switch between 'orders' and 'inventory'
  };

  const handleStatusChange = (newStatus) => {
    // Update the inventory state with the new status
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        View Order/Inventory
      </Typography>

      {/* Dropdown to choose between Orders and Inventory */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        {/* <InputLabel>Select View</InputLabel> */}
        <Select
          value={view}
          onChange={handleChange}
        >
          <MenuItem value="orders">Orders</MenuItem>
          <MenuItem value="inventory">Inventory</MenuItem>
        </Select>
      </FormControl>

      {/* Conditionally render OrdersTable or InventoryTable based on selected view */}
      {view === 'orders' ? (
        <section>
          <Typography variant="h5" component="h2" gutterBottom>
            Orders List
          </Typography>
          <OrdersTable orders={orders} />
        </section>
      ) : (
        <section>
          <Typography variant="h5" component="h2" gutterBottom>
            Inventory List
          </Typography>
          <InventoryTable inventory={inventory} />
        </section>
      )}
    </div>
  );
};

// OrdersTable Component using MUI Table
const OrdersTable = ({ orders }) => {
    const getStatusColor = (status) => {
        switch (status) {
          case 'Pending':
            return 'orange';
          case 'Fulfilled':
            return 'green';
          case 'Cancelled':
            return 'red';
          default:
            return 'gray';
        }
      };

  return (
    <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Order Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              {/* Apply dynamic color to the status cell */}
              <TableCell sx={{ color: getStatusColor(order.status), fontWeight: 'bold' }}>
                <select>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
                </select>
                {/* {order.status} */}
              </TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// PropTypes validation for OrdersTable
OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      items: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// InventoryTable Component using MUI Table
const InventoryTable = ({ inventory }) => {
    const getStatusColor = (status) => {
        switch (status) {
          case 'Low Stock':
            return 'orange';
          case 'In Stock':
            return 'green';
          case 'Out of Stock':
            return 'red';
          default:
            return 'gray';
        }
      };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item ID</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Bin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell sx={{ color: getStatusColor(item.status), fontWeight: 'bold' }}>
                {item.status}
              </TableCell>
              <TableCell>{item.dateReceived}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>{item.tag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// PropTypes validation for InventoryTable
InventoryTable.propTypes = {
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      itemName: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AdminDashboard;
