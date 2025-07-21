import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import VuiBox from "components/VuiBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import Welcome from "../profile/components/Welcome/index";
import { Height } from "@mui/icons-material";
import { height } from "@mui/system";

function Overview() {
  return (
    <DashboardLayout>
      <Header />
      <VuiBox  
        mt={4}
      sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
        <Grid container spacing={3} >
          <Grid item xs={12} md={6}>
            <Welcome />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoCard
              title="profile information"
              description="Here’s a quick overview of your profile details and contact information. Make sure your information is up to date to stay connected and informed."
              info={{
                fullName: "Admistrator",
                mobile: "8717445623",
                email: "admin@gmail.com",
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
