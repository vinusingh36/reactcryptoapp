import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Carousel } from "./Carousel";

const useStyle = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    height: "40%",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyle();
  return (
    <div className={classes.banner}>
      <Container className={useStyle.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserret",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "drakgrey",
              textTransform: "capitalize",
              fontFamily: "Montserret",
              paddingBottom: 30,
            }}
          >
            Get the all info regarding your Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export { Banner };
