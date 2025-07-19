import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // Added TextField for better UI input
import Select from "@mui/material/Select"; // Added Select for better UI dropdown
import MenuItem from "@mui/material/MenuItem"; // Added MenuItem for select options
import InputLabel from "@mui/material/InputLabel"; // Added InputLabel for select
import FormControl from "@mui/material/FormControl"; // Added FormControl for select
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox"; // Assuming VuiBox is a custom component
import VuiTypography from "components/VuiTypography"; // Assuming VuiTypography is a custom component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"; // Assuming DashboardLayout is a custom component
import DashboardNavbar from "examples/Navbars/DashboardNavbar"; // Assuming DashboardNavbar is a custom component
import { connect } from "react-redux"; // Assuming Redux is configured
import colors from "assets/theme/base/colors"; // Assuming theme colors
import typography from "assets/theme/base/typography"; // Assuming theme typography
import borders from "assets/theme/base/borders"; // Assuming theme borders
import { setAllPhoneNumbers } from "store/slices/phoneNumberSlice"; // Assuming Redux slice

// API configuration for Vapi
const API_URL = "https://api.vapi.ai/phone-number";
// IMPORTANT: In a production environment, never expose API tokens directly in frontend code.
// Use environment variables, a backend proxy, or secure authentication flows.
const API_TOKEN = "1aabca24-158a-4c8a-988b-fbb6ff3aebab";

// Helper for Material-UI Alert component in Snackbar
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function PhoneNumberIndex({ tableData, setAllPhoneNumbers }) {
  // State for form visibility and data
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: "", provider: "" });
  const [editId, setEditId] = useState(null);

  // State for confirmation dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // State for Snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // 'success', 'error', 'warning', 'info'

  // Fetch phone numbers from Vapi API
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch phone numbers");
      }
      const data = await response.json();
      const mappedData = data.map((num) => ({
        id: num.id,
        name: num.name,
        provider: num.provider,
        createdOn: num.createdAt
          ? new Date(num.createdAt).toLocaleDateString("en-CA") // Format date as YYYY-MM-DD
          : "",
      }));
      setAllPhoneNumbers(mappedData);
    } catch (error) {
      console.error("Fetch error:", error);
      setAllPhoneNumbers([]);
      showSnackbar(`Error fetching phone numbers: ${error.message}`, "error");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  // Table column definitions
  const columns = [
    { name: "Name", accessor: "name", align: "left" },
    { name: "Provider", accessor: "provider", align: "left" },
    { name: "Created on", accessor: "createdOn", align: "center" },
    { name: "Actions", accessor: "actions", align: "center" },
  ];

  // Destructure theme variables (assuming these are correctly imported and structured)
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Show Snackbar notification
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Close Snackbar notification
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle saving (add or update) a phone number
  const handleSave = async () => {
    const { name, provider } = newEntry;

    // Input validation
    if (!name || !provider) {
      return showSnackbar("All fields are required.", "warning");
    }
    if (name.length < 8) {
      return showSnackbar("Name must be at least 8 characters.", "warning");
    }

    // Format SIP URI name (lowercase, no spaces)
    const sipName = name.toLowerCase().replace(/\s+/g, "");

    let payload;
    let method;
    let url;

    if (editId) {
      // Logic for updating an existing phone number
      payload = {
        name,
        // When updating, Vapi often expects only the fields that are changing.
        // sipUri might not be updatable or might require specific handling.
        // For simplicity, including it here, but check Vapi docs for PATCH behavior.
        sipUri: `sip:${sipName}@sip.vapi.ai`,
        fallbackDestination: {
          type: "number",
          number: "+18596952804", // Hardcoded fallback number
        },
      };
      method = "PATCH";
      url = `${API_URL}/${editId}`;
    } else {
      // Logic for adding a new phone number
      payload = {
        name,
        sipUri: `sip:${sipName}@sip.vapi.ai`,
        provider,
        fallbackDestination: {
          type: "number",
          number: "+18596952804", // Hardcoded fallback number
        },
        // smsEnabled: true, // REMOVED: This caused the "property smsEnabled should not exist" error
      };
      method = "POST";
      url = API_URL; // POST to the base API_URL for creation
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || (editId ? "Failed to update." : "Failed to add."));
      }

      showSnackbar(editId ? "Phone number updated successfully!" : "Phone number added successfully!", "success");
      setShowForm(false);
      setEditId(null);
      setNewEntry({ name: "", provider: "" });
      await fetchData(); // Re-fetch data to update the table
    } catch (error) {
      console.error("Save error:", error);
      showSnackbar(`Error: ${error.message}`, "error");
    }
  };

  // Open confirmation dialog for delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  // Handle actual delete after confirmation
  const handleDelete = async () => {
    setOpenConfirmDialog(false); // Close dialog
    try {
      const response = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete.");
      }
      showSnackbar("Phone number deleted successfully!", "success");
      await fetchData(); // Re-fetch data to update the table
    } catch (error) {
      console.error("Delete error:", error);
      showSnackbar(`Error: ${error.message}`, "error");
    } finally {
      setDeleteId(null);
    }
  };

  // Render table columns (headers)
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

  // Render table rows (data and actions)
  const renderRows = (tableData || []).map((row, key) => (
    <TableRow key={`row-${row.id || key}`}> {/* Use row.id for stable keys */}
      {columns.map(({ accessor, align }) => {
        let content;

        if (accessor === "actions") {
          content = (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setShowForm(true);
                  setEditId(row.id);
                  setNewEntry({
                    name: row.name,
                    provider: row.provider,
                  });
                }}
                sx={{
                  backgroundColor: "#3f51b5",
                  textTransform: "none",
                  marginRight: 1, // Use sx for spacing in MUI
                  minWidth: 70,
                  borderRadius: '0.5rem' // Added rounded corners
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => confirmDelete(row.id)} // Call confirmDelete
                sx={{
                  backgroundColor: "#f44336",
                  textTransform: "none",
                  minWidth: 70,
                  borderRadius: '0.5rem' // Added rounded corners
                }}
              >
                Delete
              </Button>
            </>
          );
        } else {
          content = row[accessor];
        }

        return (
          <VuiBox
            key={uuidv4()} // Use uuidv4 for unique keys within map if no stable ID for cell
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
                Phone Number Management
              </VuiTypography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1, borderRadius: '0.5rem' }} // Added rounded corners
                onClick={() => {
                  setShowForm(true);
                  setEditId(null);
                  setNewEntry({ name: "", provider: "" });
                }}
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

        {/* Form for Add/Edit */}
        {showForm && (
          <VuiBox px={3} pt={2} pb={4}>
            <Card
              sx={{ backgroundColor: "#1e1e2f", padding: "20px", borderRadius: '1rem' }} // Rounded corners
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
                    Name
                  </VuiTypography>
                  <TextField
                    type="text"
                    name="name"
                    value={newEntry.name}
                    onChange={handleChange}
                    placeholder="Enter name (e.g., MyCompanySupport)"
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.5rem", // Rounded input corners
                        "& fieldset": { borderColor: "#ccc" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#81d4fa" },
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": { color: "#ccc" },
                      "& .MuiInputBase-input::placeholder": { color: "#aaa", opacity: 1 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
                    Provider
                  </VuiTypography>
                  <FormControl fullWidth variant="outlined" sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem", // Rounded select corners
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#fff" },
                      "&.Mui-focused fieldset": { borderColor: "#81d4fa" },
                    },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                  }}>
                    <InputLabel id="provider-select-label" sx={{ color: "#ccc" }}>Select Provider</InputLabel>
                    <Select
                      labelId="provider-select-label"
                      name="provider"
                      value={newEntry.provider}
                      onChange={handleChange}
                      disabled={!!editId} // Disable provider change on edit
                      label="Select Provider"
                      sx={{
                        color: "white",
                        '.MuiSvgIcon-root': { color: 'white' }, // Arrow icon color
                      }}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="vapi">Vapi</MenuItem>
                      <MenuItem value="twilio">Twilio</MenuItem>
                      {/* Add other providers as needed */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <VuiBox display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setNewEntry({ name: "", provider: "" });
                  }}
                  sx={{ marginRight: 1, borderRadius: '0.5rem' }} // Rounded corners
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  sx={{ borderRadius: '0.5rem' }} // Rounded corners
                >
                  {editId ? "Update" : "Save"}
                </Button>
              </VuiBox>
            </Card>
          </VuiBox>
        )}
      </DashboardLayout>

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this phone number? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

// Redux mapStateToProps
const mapStateToProps = (state) => ({
  tableData: state.phoneNumbers.phoneNumbers,
});

// Redux mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  setAllPhoneNumbers: (numbers) => dispatch(setAllPhoneNumbers(numbers)),
});

// Connect component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberIndex);