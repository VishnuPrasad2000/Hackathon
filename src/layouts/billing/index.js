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

import Card from "@mui/material/Card";
import billingCard from "assets/images/billing-background-card.png";
// Vision UI Dashboard React components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import CreditBalance from "./components/CreditBalance";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {/* Card 1 */}
                <Grid item xs={12} md={4}>
                  <Card
                    onClick={() => {}}
                    sx={{
                      cursor: "pointer", // makes it look clickable
                      background: `url('${billingCard}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backdropFilter: "blur(31px)",
                      borderRadius: "16px",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <VuiBox p={2} pt={0}>
                      <h6 style={{ color: "white", marginBottom: "0.5rem" }}>
                        MasterCard 1
                      </h6>
                      <p style={{ color: "white" }}>Model Name: MCX-101</p>
                      <p style={{ color: "white" }}>Voice Provider: Visa Gateway</p>
                      <p style={{ color: "white", marginBottom: "1rem" }}>
                        Created In: 2024-05-21
                      </p>
                    </VuiBox>
                  </Card>
                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      background: `url('${billingCard}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backdropFilter: "blur(31px)",
                      borderRadius: "16px",
                    }}
                  >
                    <VuiBox p={2} pt={0}>
                      <h6 style={{ color: "white", marginBottom: "0.5rem" }}>
                        MasterCard 2
                      </h6>
                      <p style={{ color: "white" }}>Model Name: MCX-102</p>
                      <p style={{ color: "white" }}>
                        Voice Provider: MasterPass
                      </p>
                      <p style={{ color: "white", marginBottom: "1rem" }}>
                        Created In: 2024-06-15
                      </p>
                    </VuiBox>
                  </Card>
                </Grid>

                {/* Card 3 */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      background: `url('${billingCard}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backdropFilter: "blur(31px)",
                      borderRadius: "16px",
                    }}
                  >
                    <VuiBox p={2} pt={0}>
                      <h6 style={{ color: "white", marginBottom: "0.5rem" }}>
                        MasterCard 3
                      </h6>
                      <p style={{ color: "white" }}>Model Name: MCX-103</p>
                      <p style={{ color: "white" }}>Voice Provider: Stripe</p>
                      <p style={{ color: "white", marginBottom: "1rem" }}>
                        Created In: 2024-07-01
                      </p>
                    </VuiBox>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PaymentMethod />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Billing;
