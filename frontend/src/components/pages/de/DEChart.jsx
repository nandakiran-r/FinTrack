import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
        },
    },
};

const labels = ["PENDING", "APPROVED", "VERIFIED", "COMPLETED", "REQUESTS"];

export function DEChart({ statistics }) {
    const { requestPendingCount, requestApprovedCount, requestVerifiedCount, requestCompletedCount, requestCount } = statistics;
    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: [requestPendingCount, requestApprovedCount, requestVerifiedCount, requestCompletedCount, requestCount],
                backgroundColor: ["#9c69f6", "#7f4dd8", "#9c69f6", "#7f4dd8", "#9c69f6",],
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
