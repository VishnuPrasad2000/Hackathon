import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { connect } from "react-redux";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function CallLogIndex() {
  const [tableData, setTableData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.vapi.ai/call", {
        method: "POST",
        headers: {
          Authorization: "Bearer 1aabca24-158a-4c8a-988b-fbb6ff3aebab",
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const formattedData = result.map(formatCallData);
      setTableData(formattedData);
      console.log("formattedData:", formattedData);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  fetchData();
}, []);

const formatCallData = (data) => {
  const start = new Date(data.startedAt);
  const end = new Date(data.endedAt);
  const durationSeconds = Math.round((end - start) / 1000);

  return [
    data.id,
    data.assistantId,
    data.phoneNumberId,
    data.customer?.sipUri || "-",
    data.endedReason,
    data.analysis?.successEvaluation,
    data.startedAt,
    `${durationSeconds}s`,
    `$${data.cost?.toFixed(4)}`
  ];
};

  const columns = [
    { name: "Phone Number", accessor: "name", align: "left" },
    { name: "Provider", accessor: "provider", align: "left" },
    { name: "Created on", accessor: "createdOn", align: "center" },
    { name: "Actions", accessor: "actions", align: "center" },
  ];

  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: "", provider: "" });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setNewEntry((prev) => ({ ...prev, [name]: value }));
};

const handleSave = async () => {
  const { name, provider } = newEntry;
  if (!name || !provider) return alert("All fields are required.");

  const payload = {
    name,
    provider,
    sipUri: `sip:${name}@sip.vapi.ai`,
    fallbackDestination: {
      type: "number",
      number: "+18596952804",
    },
  };

  try {
    const response = await fetch("https://api.vapi.ai/phone-numbers", {
      method: "POST",
      headers: {
        Authorization: "Bearer <YOUR_TOKEN_HERE>",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setShowForm(false);
    setNewEntry({ name: "", provider: "" });
  } catch (error) {
    console.error(error);
    alert("Failed to add.");
  }
};

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

  const renderRows = tableData.map((row, key) => (
    <TableRow key={`row-${key}`}>
      {columns.map(({ accessor, align }) => {
        let content;

        if (accessor === "actions") {
          content = (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => alert(`Edit ${row.name}`)}
              style={{ backgroundColor: "#3f51b5", textTransform: "none" }}
            >
              Edit
            </Button>
          );
        } else {
          content = row[accessor];
        }

        return (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
          >
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {content}
            </VuiTypography>
          </VuiBox>
        );
      })}
    </TableRow>
  ));

  return (
    <div style={{height: "100vh"}}>
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
              <TableContainer>
                <MuiTable>
                  <VuiBox component="thead">
                    <TableRow>{renderColumns}</TableRow>
                  </VuiBox>
                  <TableBody>{renderRows}</TableBody>
                </MuiTable>
              </TableContainer>
            </VuiBox>
          </Card>
        </VuiBox>
      </DashboardLayout>
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CallLogIndex);
