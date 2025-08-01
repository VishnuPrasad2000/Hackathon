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
import { connect } from "react-redux";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { setAllPhoneNumbers } from "store/slices/phoneNumberSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { BEARER_TOKEN } from "config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setAllAssistants } from "store/slices/assistantSlice";
import { useSelector } from "react-redux";

const API_URL = "https://api.vapi.ai/phone-number";

function PhoneNumberIndex({ tableData, setAllPhoneNumbers }) {
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: "",
    provider: "",
    assistant: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedAssistant, setSelectedAssistant] = useState();
  const [assistantId, setSetAssistantId] = useState();
  const [assignedAssistance, setAssignedAssistance] = useState();

  useEffect(() => {
    getAssistants();
  }, []);

  const getAssistants = async () => {
    try {
      const response = await fetch("https://api.vapi.ai/assistant", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch phone numbers");
      const data = await response.json();
      const mappedData = data.map((num) => ({
        id: num.id,
        name: num.name,
        provider: num.provider,
        createdOn: num.createdAt
          ? new Date(num.createdAt).toLocaleDateString("en-CA")
          : "",
        assistant: num.assistantId,
      }));
      setAllPhoneNumbers(mappedData);
    } catch (error) {
      console.error(error);
      setAllPhoneNumbers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "Name", accessor: "name", align: "left" },
    { name: "Provider", accessor: "provider", align: "left" },
    { name: "Created on", accessor: "createdOn", align: "left" },
    { name: "Assistant", accessor: "assistant", align: "left" },
    { name: "Actions", accessor: "actions", align: "center" },
  ];

  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { name, provider, assistantId } = newEntry;

    if (!name || !provider) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields are required.",
      });
      return;
    }

    if (name.length < 8) {
      Swal.fire({
        icon: "info",
        title: "Invalid Name",
        text: "Name must be at least 8 characters.",
      });
      return;
    }

    const sipName = name.toLowerCase().replace(/\s+/g, "");

    let payload;
    let method;
    let url;

    if (editId) {
      payload = {
        name,
        sipUri: `sip:${sipName}@sip.vapi.ai`,
        provider,
        assistantId,
        fallbackDestination: {
          type: "number",
          number: "+18596952804",
        },
      };
      method = "PATCH";
      url = `${API_URL}/${editId}`;
    } else {
      payload = {
        name,
        sipUri: `sip:${sipName}@sip.vapi.ai`,
        provider,
        assistantId,
        fallbackDestination: {
          type: "number",
          number: "+18596952804",
        },
      };
      method = "POST";
      url = API_URL;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(editId ? "Failed to update." : "Failed to add.");
      }

      Swal.fire({
        icon: "success",
        title: editId ? "Updated Successfully" : "Added Successfully",
        showConfirmButton: true,
        position: "center",
      }).then(async () => {
        setShowForm(false);
        setEditId(null);
        setNewEntry({ name: "", provider: "" });
        await fetchData();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: editId ? "Failed to update." : "Failed to add.",
        showConfirmButton: true,
        position: "center",
      });
    }
  };

  // ======= UPDATED handleDelete: uses Swal "Are you sure?" dialog ========
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This phone number will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to delete.");
        await fetchData();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The phone number has been deleted.",
          showConfirmButton: false,
          timer: 1200,
          position: "center",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Operation Failed",
          text: "Failed to delete.",
          showConfirmButton: true,
          position: "center",
        });
      }
    }
  };

  const assignNumber = async (e, numberId) => {
    setSelectedAssistant(e);

    const payload = {
      assistantId: e,
      fallbackDestination: {
        type: "number",
        number: "+18596952804",
      },
    };

    try {
      const response = await fetch(
        `https://api.vapi.ai/phone-number/${numberId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      getAssistants();
      fetchData();
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
  

  const renderRows = (tableData || []).map((row, key) => (
    <TableRow key={`row-${key}`}>
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
                  setSelectedAssistant(row.assistant);
                  setNewEntry({
                    name: row.name,
                    provider: row.provider,
                    assistant: row.assistant.name,
                  });
                }}
                style={{
                  backgroundColor: "#3f51b5",
                  textTransform: "none",
                  marginRight: 12,
                  minWidth: 70,
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(row.id)}
                style={{
                  backgroundColor: "#6a0d06ff",
                  textTransform: "none",
                  minWidth: 70,
                }}
              >
                Delete
              </Button>
            </>
          );
        }else if (accessor === "assistant") {
          const assistantObj = assistants?.assistants?.find(
            (a) => a.id === row.assistant
          );
          content = assistantObj ? assistantObj.name : "";
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
                Phone Number
              </VuiTypography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
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
        {showForm && (
          <VuiBox px={3} pt={2} pb={4}>
            <Card sx={{ backgroundColor: "#1e1e2f", padding: "20px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <VuiTypography
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    mb={1}
                  >
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

                <Grid item xs={12} md={4}>
                  <VuiTypography
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    mb={1}
                  >
                    Provider
                  </VuiTypography>
                  <select
                    name="provider"
                    value={newEntry.provider}
                    onChange={handleChange}
                    disabled={!!editId}
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
                <Grid item xs={12} md={4}>
                  <VuiTypography
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    mb={1}
                  >
                    Assistant
                  </VuiTypography>
                  <select
                    name="assistant"
                    value={selectedAssistant}
                    onChange={(e) => assignNumber(e.target.value, editId)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select Assistant</option>
                    {assistants?.assistants?.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
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
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  {editId ? "Update" : "Save"}
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
  tableData: state.phoneNumbers.phoneNumbers,
});

const mapDispatchToProps = (dispatch) => ({
  setAllPhoneNumbers: (numbers) => dispatch(setAllPhoneNumbers(numbers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberIndex);
