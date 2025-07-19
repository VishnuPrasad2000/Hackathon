import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { connect } from "react-redux";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function PhoneNumberIndex() {
  const [tableData, setTableData] = useState([]);

  // Simulate API call
  useEffect(() => {
    // Replace this with actual API call
    const fetchData = async () => {
      // Simulated API data
      const data = [
        {
          id: 1,
          name: "Plan A",
          provider: "Provider X",
          createdOn: "2025-07-01",
        },
        {
          id: 2,
          name: "Plan B",
          provider: "Provider Y",
          createdOn: "2025-07-15",
        },
      ];

      setTableData(data);
    };

    fetchData();
  }, []);

  const columns = [
    { name: "Name", accessor: "name", align: "left" },
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
                Phone Number
              </VuiTypography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }} 
               onClick={() => setShowForm(!showForm)}
              >
                Add New
              </Button>
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
        {showForm && (
  <VuiBox px={3} pt={2} pb={4}>
    <Card sx={{ backgroundColor: "#1e1e2f", padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
            Name
          </VuiTypography>
          <input
            type="text"
            name="name"
            value={newEntry.name}
            onChange={handleChange}
            placeholder="Enter name"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
            Provider
          </VuiTypography>
          <select
            name="provider"
            value={newEntry.provider}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Provider</option>
            <option value="vapi">Vapi</option>
            <option value="twilio">Twilio</option>
          </select>
        </Grid>
      </Grid>

      <VuiBox display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="success" onClick={handleSave}>
          Save
        </Button>
      </VuiBox>
    </Card>
  </VuiBox>
)}
      </DashboardLayout>
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberIndex);
