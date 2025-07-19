import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import colors from "assets/theme/base/colors";
import WelcomeMark from "layouts/Calllog/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import SatisfactionRate from "layouts/Calllog/SatisfactionRate";


const API_TOKEN = "1aabca24-158a-4c8a-988b-fbb6ff3aebab";

function CallDetails() {
  const { id } = useParams();
  const [call, setCall] = useState(null);
  const [assistantName, setAssistantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://api.vapi.ai/call/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((data) => {
        setCall(data);
        setLoading(false);
        setError("");
        // Fetch assistant name after getting the call details
        if (data && data.assistantId) {
          fetch("https://api.vapi.ai/assistant", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          })
            .then((res2) =>
              res2.ok ? res2.json() : Promise.reject(res2.statusText)
            )
            .then((assistants) => {
              const found = assistants.find((a) => a.id === data.assistantId);
              setAssistantName(found ? found.name : data.assistantId);
            })
            .catch(() => setAssistantName(data.assistantId));
        } else {
          setAssistantName("-");
        }
      })
      .catch(() => {
        setError("Could not load call details.");
        setLoading(false);
      });
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: "17px",
                  height: "200px",
                  backgroundColor: "#205cb5ff",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <VuiBox>
                  {loading ? (
                    <VuiTypography color="white">
                      Loading call details...
                    </VuiTypography>
                  ) : error ? (
                    <VuiTypography color="error">{error}</VuiTypography>
                  ) : call ? (
                    <VuiBox>
                      {/* Assistant Heading */}
                      <VuiTypography
                        color="white"
                        variant="h5"
                        fontWeight="bold"
                        mb={2}
                        textAlign="left"
                      >
                        Assistant - {assistantName}
                      </VuiTypography>

                      {/* First row: User and Duration */}
                      <Grid container spacing={2} mb={1}>
                        <Grid item xs={6}>
                          <VuiTypography
                            color="text"
                            variant="caption"
                            display="block"
                            textAlign="left"
                            mb={0.5}
                          >
                            User
                          </VuiTypography>
                          <VuiTypography color="white" textAlign="left">
                            {call.customer?.sipUri?.replace(/^sip:/, "") || "-"}
                          </VuiTypography>
                        </Grid>
                        <Grid item xs={6}>
                          <VuiTypography
                            color="text"
                            variant="caption"
                            display="block"
                            textAlign="left"
                            mb={0.5}
                          >
                            Duration
                          </VuiTypography>
                          <VuiTypography color="white" textAlign="left">
                            {call.startedAt && call.endedAt
                              ? `${Math.round(
                                  (new Date(call.endedAt) -
                                    new Date(call.startedAt)) /
                                    1000
                                )}s`
                              : "-"}
                          </VuiTypography>
                        </Grid>
                      </Grid>

                      {/* Second row: Started At and Ended At */}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <VuiTypography
                            color="text"
                            variant="caption"
                            display="block"
                            textAlign="left"
                            mb={0.5}
                          >
                            Started At
                          </VuiTypography>
                          <VuiTypography color="white" textAlign="left">
                            {call.startedAt
                              ? new Date(call.startedAt).toLocaleString()
                              : "-"}
                          </VuiTypography>
                        </Grid>
                        <Grid item xs={6}>
                          <VuiTypography
                            color="text"
                            variant="caption"
                            display="block"
                            textAlign="left"
                            mb={0.5}
                          >
                            Ended At
                          </VuiTypography>
                          <VuiTypography color="white" textAlign="left">
                            {call.endedAt
                              ? new Date(call.endedAt).toLocaleString()
                              : "-"}
                          </VuiTypography>
                        </Grid>
                      </Grid>
                    </VuiBox>
                  ) : null}
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12} xl={9}>
              <WelcomeMark messages={call?.messages} />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate
                successEvaluation={call?.analysis?.successEvaluation}
              />
            </Grid>
          </Grid>
        </VuiBox>
        {/* SAME HEIGHT GRID SECTION */}
        <VuiBox mb={3}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} lg={12} xl={7}>
              <Card sx={{ minHeight: 350, height: "100%" }}>
                <VuiBox sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Call Summary
                  </VuiTypography>
                  <VuiTypography color="white">
                    {call?.summary || "-"}
                  </VuiTypography>
                  <VuiBox flexGrow={1} /> {/* pushes content up, fills space */}
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card sx={{ minHeight: 350, height: "100%" }}>
                <VuiBox sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Evaluation Summary
                  </VuiTypography>
                  <VuiTypography color="white">
                    {call?.analysis?.summary
                      ? call.analysis.summary
                      : "No Evaluation summary for this call"}
                  </VuiTypography>
                  <VuiBox flexGrow={1} />
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} md={12} lg={8}>
            <Projects />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default CallDetails;
