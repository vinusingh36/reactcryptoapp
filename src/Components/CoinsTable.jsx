import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "darkgrey",
    },
  });

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  let { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(">>>>>>>" + error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced setter
  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  }));
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserret" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => debouncedSetSearch(e.target.value)}
          sx={{
            marginBottom: 2,
            width: "100%",
            input: {
              color: "white",
            },
            label: {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "lightgray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: 700,
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              color: "darkgrey",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}
                          {""} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}
                          {""}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={Math.ceil(handleSearch()?.length / 10)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          sx={{
            padding: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "white",

              "&.Mui-selected": {
                backgroundColor: "white",
                color: "black",
              },

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            },
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export { CoinsTable };
