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
import Footer from "examples/Footer";

import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Tables() {
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
              p={3}
            >
              <VuiTypography variant="lg" color="white">
                Phone Number
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
        {/* <Footer /> */}
      </DashboardLayout>
    </div>
  );
}

export default Tables;
