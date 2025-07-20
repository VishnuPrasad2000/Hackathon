/*!
=========================================================
* Vision UI Free React - v1.0.0
=========================================================
...
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import Welcome from "../profile/components/Welcome/index";

function Overview() {
  return (
    <DashboardLayout>
      <Header />
      <VuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Welcome />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoCard
              title="profile information"
              description="Hi Admistrator, If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term — pain avoidance is creating an illusion of equality."
              info={{
                fullName: "Admistrator",
                mobile: "8717445623",
                email: "Admin@telGenx.com",
                location: "Kochi, India",
              }}
              social={[
                { icon: <FacebookIcon />, color: "facebook" },
                { icon: <TwitterIcon />, color: "twitter" },
                { icon: <InstagramIcon />, color: "instagram" },
              ]}
            />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Overview;
