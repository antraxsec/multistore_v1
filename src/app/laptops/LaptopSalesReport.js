import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LaptopSalesReport = ({ salesData }) => {
  const [viewType, setViewType] = useState("month");
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));
  const [monthlySalesData, setMonthlySalesData] = useState({
    labels: [],
    datasets: [],
  });
  const [topLaptopsData, setTopLaptopsData] = useState({
    labels: [],
    datasets: [],
  });

  const adjustDateRange = (date, type, isStart) => {
    const newDate = new Date(date);
    if (type === "day") {
      newDate.setHours(isStart ? 0 : 23, isStart ? 0 : 59, isStart ? 0 : 59);
    } else if (type === "month") {
      newDate.setDate(
        isStart
          ? 1
          : new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
      );
      newDate.setHours(isStart ? 0 : 23, isStart ? 0 : 59, isStart ? 0 : 59);
    } else if (type === "year") {
      newDate.setMonth(isStart ? 0 : 11);
      newDate.setDate(isStart ? 1 : 31);
      newDate.setHours(isStart ? 0 : 23, isStart ? 0 : 59, isStart ? 0 : 59);
    }
    return newDate;
  };

  useEffect(() => {
    const processData = () => {
      const adjustedStartDate = adjustDateRange(startDate, viewType, true);
      const adjustedEndDate = adjustDateRange(endDate, viewType, false);

      const filteredData = salesData.filter((sale) => {
        const saleDate = new Date(sale.fechaini_salida);
        return saleDate >= adjustedStartDate && saleDate <= adjustedEndDate;
      });

      const salesByPeriod = {};
      filteredData.forEach((sale) => {
        const date = new Date(sale.fechaini_salida);
        let periodKey;
        if (viewType === "day") {
          periodKey = date.toISOString().split("T")[0];
        } else if (viewType === "month") {
          periodKey = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
        } else if (viewType === "year") {
          periodKey = date.getFullYear().toString();
        }
        salesByPeriod[periodKey] =
          (salesByPeriod[periodKey] || 0) + sale.unidades_salida;
      });

      const sortedPeriods = Object.keys(salesByPeriod).sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      setMonthlySalesData({
        labels: sortedPeriods,
        datasets: [
          {
            label: "Ventas de Laptops",
            data: sortedPeriods.map((period) => salesByPeriod[period]),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });

      const salesByLaptop = {};
      filteredData.forEach((sale) => {
        const laptopName = sale.referencia_producto.split(",")[0];
        salesByLaptop[laptopName] =
          (salesByLaptop[laptopName] || 0) + sale.unidades_salida;
      });

      const sortedLaptops = Object.entries(salesByLaptop)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15);

      setTopLaptopsData({
        labels: sortedLaptops.map(([laptop]) => laptop),
        datasets: [
          {
            label: "Unidades Vendidas",
            data: sortedLaptops.map(([, units]) => units),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    };

    processData();
  }, [salesData, startDate, endDate, viewType]);

  return (
    <div>
      <h2>Reporte de Ventas de Laptops</h2>
      <div>
        <select value={viewType} onChange={(e) => setViewType(e.target.value)}>
          <option value="day">Por Día</option>
          <option value="month">Por Mes</option>
          <option value="year">Por Año</option>
        </select>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat={
            viewType === "year"
              ? "yyyy"
              : viewType === "month"
              ? "MMMM yyyy"
              : "dd/MM/yyyy"
          }
          showMonthYearPicker={viewType === "month"}
          showYearPicker={viewType === "year"}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat={
            viewType === "year"
              ? "yyyy"
              : viewType === "month"
              ? "MMMM yyyy"
              : "dd/MM/yyyy"
          }
          showMonthYearPicker={viewType === "month"}
          showYearPicker={viewType === "year"}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-6">
          <Line
            data={monthlySalesData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `Ventas de Laptops por ${
                    viewType === "day"
                      ? "Día"
                      : viewType === "month"
                      ? "Mes"
                      : "Año"
                  }`,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text:
                      viewType === "day"
                        ? "Fecha"
                        : viewType === "month"
                        ? "Mes y Año"
                        : "Año",
                  },
                },
                y: {
                  title: { display: true, text: "Unidades Vendidas" },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div className="p-6">
          <Bar
            data={topLaptopsData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Top 5 Laptops Más Vendidas" },
              },
              scales: {
                x: {
                  title: { display: true, text: "Modelo de Laptop" },
                },
                y: {
                  title: { display: true, text: "Unidades Vendidas" },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LaptopSalesReport;
