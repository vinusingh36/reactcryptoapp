import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { CryptoState } from "../CryptoContext";

function Header() {
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const { currency, symbol, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className="title">
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
                border: "2px solid white",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export { Header };
