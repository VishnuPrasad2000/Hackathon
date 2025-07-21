import { useEffect, useState } from "react";
import Card from "@mui/material/Card"; 
import Grid from "@mui/material/Grid"; 
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { setTools } from "store/slices/assistantSlice";
import { useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@mui/material";
import { BEARER_TOKEN } from "config";
import Swal from "sweetalert2"; // ADDED
import CircularProgress from "@mui/material/CircularProgress";

function PaymentMethod(props) {
  const { assistant } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedTools, setSelectedTools] = useState([]);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    name: "",
    voiceId: "",
    voiceProvider: "",
    model: "",
    modelProvider: "",
    messages: "",
    firstMessage: "",
    endCallMessage: "",
    transcriberModel: "",
    transcriberLanguage: "",
    transcriberProvider: "",
    toolIds: [],
    serverUrl: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const resetValues = () => {
    setFormData(initialFormData);
  };

  useEffect(() => {
    if (tools && formData?.toolIds) {
      formData?.toolIds?.forEach(toolId => {
        const toolName = tools.find(tool => tool.id === toolId)?.name;
        if (toolName) {
          setSelectedTools(prev => [...prev, toolName]);
        }
      });
    }
    // eslint-disable-next-line
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchTools();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (assistant) {
      setIsUpdating(true);
      setFormData({
        name: assistant.name || "",
        voiceId: assistant.voice?.voiceId || "",
        voiceProvider: assistant.voice?.provider || "",
        model: assistant.model?.model || "",
        modelProvider: assistant.model?.provider || "",
        messages: assistant.model?.messages?.[0]?.content || "",
        firstMessage: assistant.firstMessage || "",
        endCallMessage: assistant.endCallMessage || "",
        transcriberModel: assistant.transcriber?.model || "",
        transcriberLanguage: assistant.transcriber?.language || "en",
        transcriberProvider: assistant.transcriber?.provider || "",
        toolIds: assistant?.model?.toolIds || []
      });
    }
    // eslint-disable-next-line
  }, [assistant]);

  const fetchTools = async () => {
    try {
      const response = await fetch("https://api.vapi.ai/tool", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      const formattedTools = result.map((tool, index) => ({
        id: tool.id || index,
        name: tool.name ?? undefined,
        function: tool.name ? undefined : { name: tool.function?.name || "Unnamed Tool" },
      }));

      dispatch(setTools(formattedTools));
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Tools",
        text: "Something went wrong while fetching tools.",
        showConfirmButton: true,
        position: "center"
      });
    }
  };

  // ===================== REPLACE ALERT WITH SWAL ====================
  const handleSubmit = async () => {
    const {
      name,
      voiceId,
      voiceProvider,
      model,
      modelProvider,
      messages,
      firstMessage,
      endCallMessage,
      transcriberModel,
      transcriberLanguage,
      transcriberProvider,
      analysisPrompt,
      toolIds
    } = formData;

    if (
      !name ||
      !voiceId ||
      !voiceProvider ||
      !model ||
      !modelProvider ||
      !messages ||
      !firstMessage ||
      !endCallMessage ||
      !transcriberModel ||
      !transcriberLanguage ||
      !transcriberProvider ||
      !(toolIds && toolIds.length)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
        showConfirmButton: true,
        position: "center"
      });
      return;
    }

    const payload = {
      name,
      voice: { voiceId, provider: voiceProvider },
      model: {
        model,
        provider: modelProvider,
        messages: [{ role: "system", content: messages }],
        toolIds
      },
      firstMessage,
      endCallMessage,
      transcriber: {
        model: transcriberModel,
        language: transcriberLanguage,
        provider: transcriberProvider,
      },
      server: {
        url: "https://c273ff107526.ngrok-free.app/vapi-webhook"
      },
      analysisPlan: {
        minMessagesThreshold: 2,
        successEvaluationPlan: {
          rubric: "PercentageScale",
          messages: [
            { content: analysisPrompt, role: "system" },
            {
              content:
                "Here is the transcript of the call:\n\n{{transcript}}\n\n. Here is the ended reason of the call:\n\n{{endedReason}}\n\n",
              role: "user",
            },
            {
              content:
                "Here was the system prompt of the call:\n\n{{systemPrompt}}\n\n",
              role: "user",
            },
          ],
        },
      },
    };

    try {
      const response = await fetch("https://api.vapi.ai/assistant", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Assistant created:", result);

      Swal.fire({
        icon: "success",
        title: `Assistant ${isUpdating ? "updated" : "created"} successfully!`,
        showConfirmButton: true,
        position: "center",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Something went wrong.",
        showConfirmButton: true,
        position: "center",
      });
    }
  };

  const updateAssistant = async () => {
    const {
      name,
      voiceId,
      voiceProvider,
      model,
      modelProvider,
      messages,
      firstMessage,
      endCallMessage,
      transcriberModel,
      transcriberLanguage,
      transcriberProvider,
      analysisPrompt,
      toolIds
    } = formData;

    if (
      !name ||
      !voiceId ||
      !voiceProvider ||
      !model ||
      !modelProvider ||
      !messages ||
      !firstMessage ||
      !endCallMessage ||
      !transcriberModel ||
      !transcriberLanguage ||
      !transcriberProvider ||
      !(toolIds && toolIds.length)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
        showConfirmButton: true,
        position: "center"
      });
      return;
    }

    const payload = {
      name,
      voice: { voiceId, provider: voiceProvider },
      model: {
        model,
        provider: modelProvider,
        messages: [{ role: "system", content: messages }],
        toolIds
      },
      firstMessage,
      endCallMessage,
      transcriber: {
        model: transcriberModel,
        language: transcriberLanguage,
        provider: transcriberProvider,
      },
      server: {
        url: "https://c273ff107526.ngrok-free.app/vapi-webhook"
      },
      analysisPlan: {
        minMessagesThreshold: 2,
        successEvaluationPlan: {
          rubric: "PercentageScale",
          messages: [
            { content: analysisPrompt, role: "system" },
            {
              content:
                "Here is the transcript of the call:\n\n{{transcript}}\n\n. Here is the ended reason of the call:\n\n{{endedReason}}\n\n",
              role: "user",
            },
            {
              content:
                "Here was the system prompt of the call:\n\n{{systemPrompt}}\n\n",
              role: "user",
            },
          ],
        },
      },
    };

    try {
      const response = await fetch(
        `https://api.vapi.ai/assistant/${assistant.id}`,
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
      console.log("Assistant updated:", result);

      Swal.fire({
        icon: "success",
        title: `Assistant updated successfully!`,
        showConfirmButton: true,
        position: "center",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Something went wrong.",
        showConfirmButton: true,
        position: "center",
      });
    }
  };

  let tools = [];
  tools = useSelector((state) => state.assistants.tools);

  const getPrompt = async () => {
        setLoading(true);
    try {
      const response = await fetch(
        'https://c273ff107526.ngrok-free.app/create-task-prompt',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({
            context,
            'tools': selectedTools,
          }),
        }
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();
      //setOpenModal(false);
      setFormData((prev) => ({ ...prev, messages: result }));
      return result;
    } catch (error) {
      console.error('Error creating task prompt:', error);
      Swal.fire({
        icon: "error",
        title: "Prompt Generation Failed",
        text: "Something went wrong while generating the prompt.",
        showConfirmButton: true,
        position: "center",
      });
      return null;
    }
  };

  // ------------- Render helpers --------------
  const renderInput = (label, name) => (
    <VuiBox p="5px 20px">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
        {label}
      </VuiTypography>
      <input
        type="text"
        name={name}
        placeholder={label}
        value={formData[name]}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          color: "black",
          backgroundColor: "#fff",
          border: "1px solid #555",
          borderRadius: "4px",
        }}
      />
    </VuiBox>
  );

  const renderTextarea = (label, name, rows = 4) => (
    <VuiBox p="5px 20px">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
        {label}
      </VuiTypography>
      <textarea
        name={name}
        placeholder={label}
        rows={rows}
        value={formData[name]}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          color: "black",
          backgroundColor: "#fff",
          border: "1px solid #555",
          borderRadius: "4px",
          resize: "vertical",
          minHeight: "50px",
        }}
      />
    </VuiBox>
  );

  const renderSelect = (label, name, options) => (
    <VuiBox p="5px 20px">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb={1}>
        {label}
      </VuiTypography>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          color: "black",
          backgroundColor: "#fff",
          border: "1px solid #555",
          borderRadius: "4px",
          paddingRight: "10px"
        }}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </VuiBox>
  );

  const renderMultiSelect = (label, name, options) => (
    <VuiBox p="5px 20px">
      <VuiTypography
        variant="button"
        color="white"
        fontWeight="medium"
        mb={1}
      >
        {label}
      </VuiTypography>
      <FormControl fullWidth>
        <Select
          multiple
          displayEmpty
          name={name}
          value={formData[name] || []}
          onChange={handleChange}
          renderValue={(selected) => {
            if (!selected.length) return `Select ${label}`;
            const selectedLabels = options
              .filter((opt) => selected.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ");
            return selectedLabels;
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "4px !important",
            minHeight: "40px",
            color: "#000",
            ".MuiSelect-select": {
              padding: "12px",
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              <Checkbox checked={(formData[name] || []).includes(opt.value)} />
              <ListItemText primary={opt.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </VuiBox>
  );

  // ------------- Main Render --------------
  return (
    <Card id="create-assistant">
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="32px"
      >
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          Create a New Assistant
        </VuiTypography>
        <VuiBox
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          pt="16px"
        >
          <VuiButton variant="contained" color="info" onClick={() => {
            resetValues()
            setIsUpdating(false);
          }}>
            Add Assistant
          </VuiButton>
        </VuiBox>
      </VuiBox>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {renderInput("Name", "name")}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Model Provider", "modelProvider", [
            { value: "openai", label: "openai" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Model", "model", [
            { value: "gpt-4o", label: "gpt-4o" },
            { value: "chatgpt-4o-latest", label: "chatgpt-4o-latest" },
            { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Voice Provider", "voiceProvider", [
            { value: "azure", label: "azure" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Voice", "voiceId", [
            { value: "emma", label: "emma" },
            { value: "andrew", label: "andrew" },
            { value: "brian", label: "brian" },
          ])}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderInput("First Message", "firstMessage")}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderInput("End Call Message", "endCallMessage")}
        </Grid>
        <Grid item xs={12}>
          <VuiButton
            variant="contained"
            color="info"
            onClick={() => setOpenModal(true)}
            sx={{
              position: "absolute",
              right: 45,
              mt: "-5px",
              px: "10px"
            }}
          >
            Generate Prompt
          </VuiButton>
          {renderTextarea("Assistant Prompt (Messages)", "messages", 6)}
        </Grid>
        <Grid item xs={12}>
          {renderTextarea("Evaluation Prompt", "analysisPrompt", 6)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSelect("Transcriber Provider", "transcriberProvider", [
            { value: "deepgram", label: "deepgram" },
          ])}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSelect("Transcriber Model", "transcriberModel", [
            { value: "nova", label: "nova" },
            { value: "nova-2", label: "nova-2" },
          ])}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSelect("Transcriber Language", "transcriberLanguage", [
            { value: "en", label: "English" },
          ])}
        </Grid>
      </Grid>

      <VuiBox
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        pt="16px"
      >
        <VuiButton
          variant="contained"
          color="info"
          onClick={isUpdating ? updateAssistant : handleSubmit}
        >
          {isUpdating ? "Update" : "Save"}
        </VuiButton>
      </VuiBox>
      <DashboardLayout>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "55%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              width: '60%',
              backgroundColor: "ffff",
              color: "white",
              borderRadius: "16px",
              p: 4,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(35px)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "white" }}>
              Generate Custom Assistant Prompt with Departments
            </h2>
            <p style={{ marginTop: 0, color: "white" }}>
              You can add any prompt logic here.
            </p>
            <Grid item xs={12} md={4}>
              <>
                {renderMultiSelect(
                  "Tools",
                  "toolIds",
                  tools.map((tool) => ({
                    value: tool.id,
                    label: tool.name ?? tool.function?.name ?? "Unnamed Tool",
                  }))
                )}
              </>
            </Grid>
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
              ) :(
            <textarea
              rows={7}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                resize: 'vertical',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginTop: '16px',
                fontSize: '14px',
              }}
            />
            )};
            <VuiBox display="flex" justifyContent="flex-end" gap="8px" mt={2}>
              <VuiButton variant="contained" color="info" onClick={() => getPrompt()}>
                Create
              </VuiButton>
              <VuiButton variant="contained" color="info" onClick={() => setOpenModal(false)}>
                Close
              </VuiButton>
            </VuiBox>
          </Box>
        </Modal>
      </DashboardLayout>
    </Card>
  );
}

export default PaymentMethod;
