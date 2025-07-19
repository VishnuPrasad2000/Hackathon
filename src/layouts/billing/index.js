import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PaymentMethod from "layouts/billing/components/PaymentMethod";

import { useEffect, useState } from "react";
import { setAllAssistants } from "store/slices/assistantSlice";
import { useSelector, useDispatch } from "react-redux";


function Billing() {
  const dispatch = useDispatch();
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const getAssistants = async () => {
    try {
      const response = await fetch("https://api.vapi.ai/assistant", {
        method: "GET",
        headers: {
          Authorization: "Bearer 1aabca24-158a-4c8a-988b-fbb6ff3aebab",
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      dispatch(setAllAssistants(result));
    } catch (error) {
      console.error(error);
      alert("Failed to add.");
    }
  };

  let assistants = [];
  assistants = useSelector((state) => state.assistants);
  console.log("Assistants:", assistants);


  useEffect(() => {
    getAssistants();
  }, []);

  function convertToIST(isoString) {
    const date = new Date(isoString);

    // IST is UTC+5:30
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-IN', options).format(date);
  }

  const populateFields = (assistant) => {
    setSelectedAssistant(assistant);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <VuiBox
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  paddingBottom: 1,
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": {
                    height: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                  },
                }}
              >
                {assistants?.assistants?.map((assistant, index) => (
                  <Card
                    key={index}
                    onClick={() => { populateFields(assistant) }}
                    sx={{
                      minWidth: 300,
                      flexShrink: 0,
                     // background: `url('${billingCard}')`,
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
                      <h6 style={{ color: "white", marginBottom: "0.5rem" }}>Voice Assistant:</h6>
                      <p style={{ color: "white" }}>Name: {assistant?.name}</p>
                      <p style={{ color: "white" }}>Voice : {assistant?.voice?.voiceId}</p>
                    </VuiBox>
                  </Card>
                ))}
              </VuiBox>

            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PaymentMethod assistant={selectedAssistant} />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Billing;
