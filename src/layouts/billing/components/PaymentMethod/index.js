import { useState } from "react";
import Card from "@mui/material/Card"; // You can replace this too if needed
import Grid from "@mui/material/Grid"; // Optional: Can replace with flexbox later
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

function PaymentMethod() {
  const [formData, setFormData] = useState({
    name: "",
    voiceId: "",
    voiceProvider: "",
    model: "",
    modelProvider: "",
    messages: "",
    firstMessage: "",
    endCallMessage: "",
    transcriberModel: "",
    transcriberLanguage: "en",
    transcriberProvider: "",
    analysisPrompt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      !transcriberProvider
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      name,
      voice: { voiceId, provider: voiceProvider },
      model: {
        model,
        provider: modelProvider,
        messages: [{ role: "system", content: messages }],
      },
      firstMessage,
      endCallMessage,
      transcriber: {
        model: transcriberModel,
        language: transcriberLanguage,
        provider: transcriberProvider,
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
          Authorization: "Bearer 1aabca24-158a-4c8a-988b-fbb6ff3aebab",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Assistant created:", result);
      alert("Assistant created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

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
      </VuiBox>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {renderInput("Name", "name")}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Model", "model", [
            { value: "gpt-4o", label: "gpt-4o" },
            { value: "chatgpt-4o-latest", label: "chatgpt-4o-latest" },
            { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Model Provider", "modelProvider", [
            { value: "openai", label: "openai" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Voice", "voiceId", [
            { value: "emma", label: "emma" },
            { value: "andrew", label: "andrew" },
            { value: "brian", label: "brian" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderSelect("Voice Provider", "voiceProvider", [
            { value: "azure", label: "azure" },
          ])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderInput("First Message", "firstMessage")}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderInput("End Call Message", "endCallMessage")}
        </Grid>
        <Grid item xs={12}>
          {renderTextarea("Assistant Prompt (Messages)", "messages", 6)}
        </Grid>
        <Grid item xs={12}>
          {renderTextarea("Evaluation Prompt", "analysisPrompt", 6)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSelect("Transcriber Model", "transcriberModel", [
            { value: "nova", label: "nova" },
            { value: "nova-2", label: "nova-2" },
          ])}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSelect("Transcriber Provider", "transcriberProvider", [
            { value: "deepgram", label: "deepgram" },
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
        <VuiButton variant="contained" color="info" onClick={handleSubmit}>
          CREATE
        </VuiButton>
      </VuiBox>
    </Card>
  );
}

export default PaymentMethod;
