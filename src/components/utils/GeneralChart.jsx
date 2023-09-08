/* eslint-disable react/prop-types */

import { Line, Bar, Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,  // x axis
    LinearScale,   // y axis
    PointElement,
    BarElement,

    Title,
    Tooltip,
    Legend,

} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function GeneralChart({ userData, labelFieldName, dataFieldName, type, color }) {
    const data = {
        // get the labels from the userData
        labels: userData.map((data) => data[labelFieldName]),

        datasets: [
            {
                label: 'Sales 2021 (M)',
                data: userData.map((data) => data[dataFieldName]),
                borderColor: color,
                backgroundColor: color,
                pointBackgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointBorderColor: 'rgba(53, 162, 235, 0.5)',
            },

        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
            tooltip: {
                enabled: true, // Enable tooltips
                mode: 'index', // 'index' shows tooltips for all datasets at the same index
                intersect: false, // Set to true if you want tooltips to appear only when hovering directly over data points
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        display: false,
                    },
                },
            ],
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                },
            ],
        },
    };

    return (
        <div>
            {type === 'LINE' &&
                <Line data={data}
                    options={options}> </Line>
            }

            {type === 'BAR' &&
                <Bar data={data}
                    options={options} > </Bar>
            }
        </div>
    );
}

export default GeneralChart;
