import { useState } from "react";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const WhoopieDoopieSorter = () => {
    const [ range, setRange ] = useState(100);
    const [ data, setData ] = useState(createDataset(100));

    const chartData = {
        datasets: [
          {
            label: 'Dataset 1',
            data: data.map((item, index) => ({ x: index.toString(), y: item })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <div>
            <input type="number" value={range} onChange={e => setRange(e.target.value as unknown as number)}/>
            <Bar options={options} data={chartData} />
        </div>
    )
}

const ficherYatesShuffle = (array: number[]) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const createDataset = (size: number) => {
    const data = [];

    for (let i = 0; i < size; i++){
        data[i] = i;
    }

    return ficherYatesShuffle(data);
}