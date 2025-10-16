import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { makeStyles, styled } from "@mui/styles";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { chartDays } from "../config/data";
import { SelectButton } from "./SelectButton";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    let { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    console.log(data);
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // center children horizontally
    justifyContent: "center", // center children vertically
    marginTop: 25,
    padding: 40,
    // [theme.breakpoints.down("md")]: {
    //   width: "100%",
    //   marginTop: 0,
    //   padding: 20,
    //   paddingTop: 0,
    // },
  }));

  return (
    <Container>
      {!historicalData ? (
        <CircularProgress
          style={{
            color: "gold",
          }}
          size={200}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                    : `${date.getHours()}: ${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past  ${days} Days) in ${currency}`,
                  borderColor: "gold",
                },
              ],
            }}
            options={{ elements: { point: { radius: 1 } } }}
          />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export { CoinInfo };
