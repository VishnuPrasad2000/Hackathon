/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// prop-types is a library for typechecking of props
// @mui material components
import Card from "@mui/material/Card";
import billingCard from "assets/images/billing-background-card.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import PropTypes from "prop-types";
import { RiMastercardFill } from "react-icons/ri";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MasterCard() {
  return (
    <Card
      sx={{ background: `url('${billingCard}')`, backdropfilter: "blur(31px)" }}
    >
      <VuiBox p={2} pt={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="white">
              MasterCard 1
            </Typography>
            <Typography variant="body2" color="gray">
              Model Name: MCX-101
            </Typography>
            <Typography variant="body2" color="gray">
              Voice Provider: Visa Gateway
            </Typography>
            <Typography variant="body2" color="gray" mb={1}>
              Created In: 2024-05-21
            </Typography>
          </Grid>{" "}
        </Grid>
      </VuiBox>
      <VuiBox p={2} pt={0}>
        {" "}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom color="white">
            MasterCard 2
          </Typography>
          <Typography variant="body2" color="gray">
            Model Name: MCX-102
          </Typography>
          <Typography variant="body2" color="gray">
            Voice Provider: MasterPass
          </Typography>
          <Typography variant="body2" color="gray" mb={1}>
            Created In: 2024-06-15
          </Typography>
        </Grid>
      </VuiBox>

      <VuiBox p={2} pt={0}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom color="white">
            MasterCard 3
          </Typography>
          <Typography variant="body2" color="gray">
            Model Name: MCX-103
          </Typography>
          <Typography variant="body2" color="gray">
            Voice Provider: Stripe
          </Typography>
          <Typography variant="body2" color="gray" mb={1}>
            Created In: 2024-07-01
          </Typography>
        </Grid>
      </VuiBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
MasterCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "text",
  ]),
};

export default MasterCard;
