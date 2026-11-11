import React from 'react';
import { useQuery } from 'react-query';
import serverLogsService from './serverLogs.service';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Server Requests',
    },
  },
};

const createChartData = (data) => {
  return {
    labels: data.map((item) => moment(item.date).format("M/DD - hh:mm:ss A")), //new Date(item.date).toLocaleString('en-US')),
    datasets: [
      {
        label: '200s',
        data: data.map((item) => item['200s']),
        borderColor: 'rgb(50,205,50)',
        backgroundColor: 'rgba(50,205,50, 0.5)',
      },
      {
        label: 'Auth',
        data: data.map((item) => item['400s']),

        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Malicious',
        data: data.map((item) => item['404s']),

        borderColor: 'rgb(128, 0, 0)',
        backgroundColor: 'rgba(128, 0, 0, 0.5)',
      },
      {
        label: '500s',
        data: data.map((item) => item['500s']),

        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
};

const ServerReqTimeSeriesCard = () => {
  const { data, isLoading } = useQuery(['getRequestTimeSeries'], async () => {
    const { data } = await serverLogsService.getRequestTimeSeries({
      startDate: new Date(
        new Date(new Date().setDate(new Date().getDate() - 7)).setHours(
          0,
          0,
          0,
          0
        )
      ).getTime(),
      endDate: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
    });
    //  console.log("data", data)
    return data;
  });

  return (
    <div className="card mt-3 chart-card">
      <div className="card-body ">
        <div className="row">
          <div className="col-9 ">
            <span className="chart-card__title">{'SERVER Requests'}</span>
          </div>
          <div className="col-3 chart-card__value">
            {/* <span className="single-target">{'SINGLE TARGET'}</span>
            <span className="multi-target">{'MULTI TARGET'}</span> */}
          </div>
        </div>
        <div className="row pt-4">
          {!isLoading && data?.length > 0 && (
            <Line options={options} data={createChartData(data)} />
          )}

          {/* {!isLoading &&
            data?.length > 0 &&
            data.map((gamemodeData) => (
              <div className="col-2" key={gamemodeData._id}>
                <GamePlayTime
                  gamemode={gamemodeData._id}
                  dataPoints={[
                    gamemodeData.multiTarget / 1000,
                    gamemodeData.singleTarget / 1000,
                  ]}
                  styles={gamePlayTimeChartStyles}
                />
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default ServerReqTimeSeriesCard;
