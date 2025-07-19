import Grid from "@mui/material/Grid";
import { Card, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";
import WelcomeMark from "layouts/Calllog/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import SatisfactionRate from "layouts/Calllog/SatisfactionRate";
import { IoIosRocket } from "react-icons/io";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

function callDetails() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} xl={12}>
              <Card sx={{
                  padding: "17px",
                  height: "200px",
                  backgroundColor: "#205cb5ff",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}>
                <VuiBox>
                  <VuiBox>
                    <Grid container alignItems="center">
                      <Grid item xs={8}>
                        <VuiBox ml={ 2 } lineHeight={1}>
                          <VuiTypography
                            variant="caption"
                            color={"white"}
                            opacity={1}
                            textTransform="capitalize"
                          >
                          </VuiTypography>
                          <VuiTypography variant="subtitle1" fontWeight="bold" color="white">
                            <VuiTypography variant="button" fontWeight="bold">
                            </VuiTypography>
                          </VuiTypography>
                        </VuiBox>
                      </Grid>
                    </Grid>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={9}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12} xl={7}>
              <Card>
                <VuiBox sx={{ height: "400px" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                   Call Summary 
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography
                      variant="button"
                      color="success"
                      fontWeight="bold"
                    >
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                  </VuiBox>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography
                      variant="button"
                      color="success"
                      fontWeight="bold"
                    >
                      (+23){" "}
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        32,984
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        2,42M
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        2,400$
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        320
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={12} lg={8}>
            <Projects />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default callDetails;
