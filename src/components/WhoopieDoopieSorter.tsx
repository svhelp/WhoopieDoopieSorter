import { useMemo, useState } from "react";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ficherYatesShuffle } from "@/utils/ficherYatesShuffle";
import { bubbleSort } from "@/utils/sorters/bubble";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export const options = {
  responsive: true,
  animation: {
      duration: 0
  },
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

    const reset = () => {
      setData(createDataset(range));
    }

    const {
      sort,
      cancellationToken
    } = useMemo(() => bubbleSort(), []);

    return (
        <div>
            <input type="number" value={range} onChange={e => setRange(e.target.value as unknown as number)}/>
            <Bar options={options} data={chartData} />
            <button onClick={() => sort({arraySize: data.length, dataSetter: setData})}>Bubble sort</button>
            <button onClick={reset}>Reset</button>
            <button onClick={cancellationToken}>Stop sort</button>
        </div>
    )
}


const createDataset = (size: number) => {
    const data = [];

    for (let i = 0; i < size; i++){
        data[i] = i;
    }

    return ficherYatesShuffle(data);
}