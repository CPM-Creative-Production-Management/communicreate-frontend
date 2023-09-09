/* eslint-disable react/prop-types */

import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,  // x axis
    LinearScale,   // y axis
    PointElement,
    BarElement,
    ArcElement,

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
    ArcElement,
    Title,
    Tooltip,
    Legend
);


function GeneralChart({ userData1, userData2, labelFieldName, dataFieldName, label1, label2, type }) {

    // generate a reproducible random color in rgba format
    const rand_color1 = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
    const rand_color2 = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;

    const data = {
        // get the labels from the userData
        labels: userData1.map((data) => data[labelFieldName]),
        datasets: [
            {
                label: label1,
                data: userData1.map((data) => data[dataFieldName]),
                borderColor: rand_color1,
                backgroundColor: rand_color1,
                pointBackgroundColor: rand_color1,
                pointBorderColor: rand_color1,
            },
        ],
    };

    if (userData2) {
        // append the second dataset
        data.datasets.push({
            label: label2,
            data: userData2.map((data) => data[dataFieldName]),
            borderColor: rand_color2,
            backgroundColor: rand_color2,
            pointBackgroundColor: rand_color2,
            pointBorderColor: rand_color2,
        });
    }

    if (type === 'PIE' || type === 'DOUGHNUT') {
        // set backgroundColor to an array of colors
        data.datasets[0].backgroundColor = [];
        data.datasets[0].borderColor = [];


        // set backgroundColor to an array of colors
        data.datasets[0].data.forEach(() => {
            const rand_color1 = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
            // make a new color with the same color as rand_color1 but with opacity 1
            const rand_color2 = `rgba(${rand_color1.split(',')[0].split('(')[1]}, ${rand_color1.split(',')[1]}, ${rand_color1.split(',')[2]}, 1)`;


            

            data.datasets[0].backgroundColor.push(rand_color1);
            data.datasets[0].borderColor.push(rand_color2);

            

        });
        
    }

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

            {type === 'PIE' &&
                <Pie data={data}
                    options={options} > </Pie>
            }

            {type === 'DOUGHNUT' &&
                <Doughnut data={data}
                    options={options} > </Doughnut>
            }
        </div>
    );
}

export default GeneralChart;
