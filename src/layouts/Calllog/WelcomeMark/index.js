import React from "react";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const WelcomeMark = () => {
  const sampleMessages = [
  { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Can you show me the report?" },
  { sender: "bot", text: "Sure, here's the latest report." },
    { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Can you show me the report?" },
  { sender: "bot", text: "Sure, here's the latest report." },
    { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Can you show me the report?" },
  { sender: "bot", text: "Sure, here's the latest report." },
    { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Can you show me the report?" },
  { sender: "bot", text: "Sure, here's the latest report." },
    { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Can you show me the report?" },
  { sender: "bot", text: "Sure, here's the latest report." },
    { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Can you show me the report?" },
  { sender: "bot", text: "Sure, here's the latest report." },
];
  return (
<Card
  sx={{
    height: "390px",
    py: "32px",
    px: "20px",
    backgroundColor: "#205cb5ff",
    backgroundSize: "cover",
    backgroundPosition: "50%",
    color: "white",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  }}
>
  <VuiBox>
    <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
      Communication History
    </VuiTypography>
  </VuiBox>

  <VuiBox
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      mt: 2,
      mb: 2,
      pr: 1,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      "&::-webkit-scrollbar": {
        width: 0,
        height: 0,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
    {sampleMessages.map((msg, idx) => (
      <div
        key={idx}
        style={{
          alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
          backgroundColor: msg.sender === "user" ? "#007AFF" : "#e5e5ea",
          color: msg.sender === "user" ? "white" : "black",
          padding: "10px 14px",
          borderRadius: "16px",
          maxWidth: "75%",
          wordWrap: "break-word",
          fontSize: "0.9rem",
        }}
      >
        {msg.text}
      </div>
    ))}
  </VuiBox>

  <VuiTypography
    component="a"
    href="#"
    variant="button"
    color="white"
    fontWeight="regular"
    sx={{
      mr: "5px",
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",

      "& .material-icons-round": {
        fontSize: "1.125rem",
        transform: `translate(2px, -0.5px)`,
        transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
      },

      "&:hover .material-icons-round, &:focus  .material-icons-round": {
        transform: `translate(6px, -0.5px)`,
      },
    }}
  >
  </VuiTypography>
</Card>

  );
};

export default WelcomeMark;
