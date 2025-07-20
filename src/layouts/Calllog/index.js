import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { connect } from "react-redux";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BEARER_TOKEN } from "config";

const API_URL = "https://api.vapi.ai/call";
const ASSISTANT_API_URL = "https://api.vapi.ai/assistant";

function CallLogIndex() {
  const [tableData, setTableData] = useState([]);
  const [assistantMap, setAssistantMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssistants = async () => {
      setLoading(true);
      try {
        const response = await fetch(ASSISTANT_API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const assistantsData = await response.json();
        const map = {};
        assistantsData.forEach((a) => (map[a.id] = a.name));
        setAssistantMap(map);
      } catch (error) {
        console.error("Error fetching assistants:", error);
        setAssistantMap({});
        setLoading(false);
      }
    };
    fetchAssistants();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        const formattedData = result.map(formatCallData);
        setTableData(formattedData);
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    if (Object.keys(assistantMap).length > 0) {
      fetchData();
    }
  }, [assistantMap]);

  const formatCallData = (data) => {
    let duration = "-";
    if (data.startedAt && data.endedAt) {
      const start = new Date(data.startedAt);
      const end = new Date(data.endedAt);
      const durationSeconds = Math.round((end - start) / 1000);
      duration = `${durationSeconds}s`;
    }

    const assistantName =
      assistantMap[data.assistantId] || data.assistantId || "-";

    const user = data.customer?.sipUri
      ? data.customer.sipUri.replace(/^sip:/, "")
      : "-";

    return {
      id: data.id,
      assistant: assistantName,
      user: user,
      startedAt: data.startedAt
        ? new Date(data.startedAt).toLocaleString()
        : "-",
      duration: duration,
    };
  };

  const columns = [
    { name: "Assistant", accessor: "assistant", align: "left" },
    { name: "User", accessor: "user", align: "left" },
    { name: "Conversation Started At", accessor: "startedAt", align: "center" },
    { name: "Duration", accessor: "duration", align: "center" },
    { name: "", accessor: "arrow", align: "center" },
  ];

  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align }) => (
    <VuiBox
      key={name}
      component="th"
      pt={1.5}
      pb={1.25}
      pl={align === "left" ? 3 : 1}
      pr={align === "right" ? 3 : 1}
      textAlign={align}
      fontSize={size.xxs}
      fontWeight={fontWeightBold}
      color="text"
      opacity={0.7}
      borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
    >
      {name.toUpperCase()}
    </VuiBox>
  ));

  const renderRows = tableData.map((row) => (
    <TableRow
      key={row.id}
      hover
      tabIndex={0}
      style={{
        cursor: "pointer",
      }}
      onClick={() => (window.location.href = `/call-log/${row.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.location.href = `/call-log/${row.id}`;
        }
      }}
      sx={{
        "&:hover": {
          backgroundColor: grey[800] || "#f5f5f5",
        },
      }}
    >
      <VuiBox
        component="td"
        p={1}
        textAlign="left"
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        <VuiTypography variant="button" fontWeight="regular" color="text">
          {row.assistant}
        </VuiTypography>
      </VuiBox>
      <VuiBox
        component="td"
        p={1}
        textAlign="left"
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        <VuiTypography variant="button" fontWeight="regular" color="text">
          {row.user}
        </VuiTypography>
      </VuiBox>
      <VuiBox
        component="td"
        p={1}
        textAlign="center"
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        <VuiTypography variant="button" fontWeight="regular" color="text">
          {row.startedAt}
        </VuiTypography>
      </VuiBox>
      <VuiBox
        component="td"
        p={1}
        textAlign="center"
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        <VuiTypography variant="button" fontWeight="regular" color="text">
          {row.duration}
        </VuiTypography>
      </VuiBox>
      <VuiBox
        component="td"
        p={1}
        textAlign="center"
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        <ArrowForwardIcon color="action" />
      </VuiBox>
    </TableRow>
  ));

  // Main layout (loader only inside the Card)
  return (
    <div style={{ height: "100vh" }}>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox py={3}>
          <Card>
            <VuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              pr={3}
            >
              <VuiTypography variant="lg" color="white">
                Call Logs
              </VuiTypography>
            </VuiBox>
            <VuiBox px={3} pb={3}>
              {loading ? (
                <VuiBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="250px"
                  width="100%"
                >
                  <CircularProgress size={50} thickness={5} color="inherit" />
                </VuiBox>
              ) : (
                <TableContainer>
                  <MuiTable>
                    <VuiBox component="thead">
                      <TableRow>{renderColumns}</TableRow>
                    </VuiBox>
                    <TableBody>{renderRows}</TableBody>
                  </MuiTable>
                </TableContainer>
              )}
            </VuiBox>
          </Card>
        </VuiBox>
      </DashboardLayout>
    </div>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CallLogIndex);
