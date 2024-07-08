import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesComponent = ({ salesData }) => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [viewMode, setViewMode] = useState("daily");
  const [filteredData, setFilteredData] = useState([]);
  const [salesCountChart, setSalesCountChart] = useState(null);
  const [salesAmountChart, setSalesAmountChart] = useState(null);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, viewMode, salesData]);

  const filterData = () => {
    const filtered = salesData.filter((sale) => {
      const saleDate = new Date(sale.fechaini_salida);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    setFilteredData(filtered);
    processChartData(filtered);
  };

  const processChartData = (data) => {
    const salesByPeriod = {};
    const users = new Set();

    data.forEach((sale) => {
      const saleDate = new Date(sale.fechaini_salida);
      let periodKey;
      switch (viewMode) {
        case "daily":
          periodKey = saleDate.toISOString().split("T")[0];
          break;
        case "monthly":
          periodKey = `${saleDate.getFullYear()}-${String(
            saleDate.getMonth() + 1
          ).padStart(2, "0")}`;
          break;
        case "yearly":
          periodKey = saleDate.getFullYear().toString();
          break;
      }

      if (!salesByPeriod[periodKey]) {
        salesByPeriod[periodKey] = {};
      }
      if (!salesByPeriod[periodKey][sale.u_usuario]) {
        salesByPeriod[periodKey][sale.u_usuario] = { count: 0, amount: 0 };
      }
      salesByPeriod[periodKey][sale.u_usuario].count += 1;
      salesByPeriod[periodKey][sale.u_usuario].amount += sale.valortotal_salida;
      users.add(sale.u_usuario);
    });

    const labels = Object.keys(salesByPeriod).sort();
    const userArray = Array.from(users);

    const datasets = userArray.map((user) => ({
      label: `Cantidad - ${user}`,
      data: labels.map((key) => salesByPeriod[key][user]?.count || 0),
      backgroundColor: getRandomColor(),
    }));

    setSalesCountChart({
      labels,
      datasets,
    });

    const amountDatasets = userArray.map((user) => ({
      label: `Monto - ${user}`,
      data: labels.map((key) => salesByPeriod[key][user]?.amount || 0),
      backgroundColor: getRandomColor(),
    }));

    setSalesAmountChart({
      labels,
      datasets: amountDatasets,
    });
  };

  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  };

  const getTopSeller = () => {
    if (filteredData.length === 0) return "No hay datos";
    const userSales = {};
    filteredData.forEach((sale) => {
      if (userSales[sale.u_usuario]) {
        userSales[sale.u_usuario] += sale.valortotal_salida;
      } else {
        userSales[sale.u_usuario] = sale.valortotal_salida;
      }
    });
    const topSeller = Object.entries(userSales).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
    return `${topSeller[0]} (${topSeller[1]})`;
  };

  return (
    <div className="p-4 sm:ml-64 bg-gray-50">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h2 className=" font-bold text-gray-500 text-lg mb-3">
          Análisis de Ventas
        </h2>
        <div className=" grid grid-cols-3 gap-3">
          <label>
            Fecha de inicio:
            <input
              type="date"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5  "
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Fecha de fin:
            <input
              type="date"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5  "
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="daily">Diario</option>
            <option value="monthly">Mensual</option>
            <option value="yearly">Anual</option>
          </select>
        </div>
        <div>
          <h3 className="my-3 font-semibold">
            Mejor vendedor: {getTopSeller()}
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 p-3">
          <div className="border rounded-3xl shadow-md p-6">
            {salesCountChart && (
              <div className="h-52 lg:h-72 pb-10">
                <h3>
                  Cantidad de Ventas por{" "}
                  {viewMode === "daily"
                    ? "Día"
                    : viewMode === "monthly"
                    ? "Mes"
                    : "Año"}{" "}
                  y Usuario
                </h3>
                <Bar
                  data={salesCountChart}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            )}
          </div>
          <div className="border rounded-3xl shadow-md p-6">
            {salesAmountChart && (
              <div className="h-52 lg:h-72 pb-10">
                <h3>
                  Monto Total de Ventas por{" "}
                  {viewMode === "daily"
                    ? "Día"
                    : viewMode === "monthly"
                    ? "Mes"
                    : "Año"}{" "}
                  y Usuario
                </h3>
                <Bar
                  data={salesAmountChart}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesComponent;
