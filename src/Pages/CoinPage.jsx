import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { CoinInfo } from "../Components/CoinInfo";
import { LinearProgress, Typography, Box, Stack } from "@mui/material";
import { numberWithCommas } from "../Components/Banner/Carousel";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        padding: 2,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: { md: "2px solid grey", xs: "none" },
          pr: { md: 3, xs: 0 },
        }}
      >
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Montserrat",
            textAlign: "center",
          }}
        >
          {coin.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            px: 3,
            pb: 2,
            pt: 0,
            textAlign: "justify",
          }}
        >
          {coin.description.en.split(". ")[0]}.
        </Typography>

        {/* Market Data */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignSelf: "start",
            px: 3,
            pt: 1,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          {/* Rank */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Rank:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {coin.market_cap_rank}
            </Typography>
          </Box>

          {/* Current Price */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Current Price:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>

          {/* Market Cap */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Market Cap:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Coin Chart / Info */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          mt: { xs: 3, md: 0 },
          px: { xs: 2, md: 0 },
        }}
      >
        <CoinInfo coin={coin} />
      </Box>
    </Box>
  );
}

export { CoinPage };
