import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data, title, dataKey = "totalSales" }) {
  const chartData = data.map((item) => {
    const isMonthKey = typeof item._id === "string" && item._id.match(/^\d{4}-\d{2}$/);
    const rawDate = isMonthKey ? `${item._id}-01` : item._id;
    const dateObj = new Date(rawDate);

    return {
      date: isMonthKey
        ? dateObj.toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })
        : dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          }),
      value: item[dataKey] ?? 0,
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}