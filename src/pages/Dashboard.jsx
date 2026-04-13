import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    dailyOrders: 0,
    totalProducts: 0,
    totalProductsSold: 0,
    totalProductsSoldAll: 0,
    productsSoldThisMonth: 0,
    todayAddedProducts: 0,
    thisMonthAddedProducts: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    lowStockItems: 0,
  });

  const [recentSales, setRecentSales] = useState([]);
  const [salesChart, setSalesChart] = useState([]);
  const [addedProductsChart, setAddedProductsChart] = useState([]);
  const [productsSoldChart, setProductsSoldChart] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/dashboard-stats");
      const data = res.data;
      setStats(data.summary || {});
      setRecentSales(data.recentSales || []);
      setSalesChart(data.salesChart || []);
      setAddedProductsChart(data.addedProductsChart || []);
      setProductsSoldChart(data.productsSoldChart || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      await fetchDashboard();
    };

    loadDashboard();
  }, []);

  return (
    <div className="p-2 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow">
          <p className="text-blue-700 text-sm font-medium">Total Products</p>
          <h2 className="text-3xl font-bold text-blue-600">{stats?.totalProducts}</h2>
        </div>

        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-lg shadow">
          <p className="text-cyan-700 text-sm font-medium">Daily Orders</p>
          <h2 className="text-3xl font-bold text-cyan-600">{stats?.dailyOrders}</h2>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg shadow">
          <p className="text-purple-700 text-sm font-medium">Products Sold Today</p>
          <h2 className="text-3xl font-bold text-purple-600">{stats?.totalProductsSold}</h2>
        </div>

        <div className="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-6 rounded-lg shadow">
          <p className="text-fuchsia-700 text-sm font-medium">All Sold Products</p>
          <h2 className="text-3xl font-bold text-fuchsia-600">{stats?.totalProductsSoldAll}</h2>
        </div>

        <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-lg shadow">
          <p className="text-violet-700 text-sm font-medium">Products Sold This Month</p>
          <h2 className="text-3xl font-bold text-violet-600">{stats?.productsSoldThisMonth}</h2>
        </div>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg shadow">
          <p className="text-emerald-700 text-sm font-medium">Products Added Today</p>
          <h2 className="text-3xl font-bold text-emerald-600">{stats?.todayAddedProducts}</h2>
        </div>

        <div className="bg-lime-50 border-l-4 border-lime-500 p-6 rounded-lg shadow">
          <p className="text-lime-700 text-sm font-medium">Products Added This Month</p>
          <h2 className="text-3xl font-bold text-lime-600">{stats?.thisMonthAddedProducts}</h2>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow">
          <p className="text-green-700 text-sm font-medium">Total Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">₹{stats?.totalRevenue}</h2>
        </div>

        <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-lg shadow">
          <p className="text-sky-700 text-sm font-medium">Today's Revenue</p>
          <h2 className="text-3xl font-bold text-sky-600">₹{stats?.todayRevenue}</h2>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow">
          <p className="text-red-700 text-sm font-medium">Low Stock Items</p>
          <h2 className="text-3xl font-bold text-red-600">{stats?.lowStockItems}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <SalesChart data={salesChart} title="Last 7 Days Sales" dataKey="totalSales" />
        <SalesChart
          data={addedProductsChart}
          title="Products Added (Last 6 Months)"
          dataKey="totalAdded"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <SalesChart
          data={productsSoldChart}
          title="Products Sold (Last 6 Months)"
          dataKey="totalSold"
        />

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Sales</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-2 text-left">Bill</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale._id} className="border-b">
                    <td className="p-2">{sale.billNumber}</td>
                    <td className="p-2">₹{sale.finalAmount}</td>
                    <td className="p-2">{new Date(sale.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/add-product")}
              className="bg-green-500 text-white py-3 rounded hover:bg-green-600"
            >
              Add Product
            </button>
            <button
              onClick={() => navigate("/sales")}
              className="bg-green-500 text-white py-3 rounded hover:bg-green-600"
            >
              New Sale
            </button>
            <button
              onClick={() => navigate("/products")}
              className="bg-green-500 text-white py-3 rounded hover:bg-green-600"
            >
              View Products
            </button>
            <button
              onClick={() => navigate("/purchase")}
              className="bg-green-500 text-white py-3 rounded hover:bg-green-600"
            >
              Purchase Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
