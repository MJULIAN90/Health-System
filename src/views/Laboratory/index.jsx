import React from "react";
import { Box } from "@mui/material";
import useLaboratory from "../../Hooks/useLaboratory";
import { Container } from "../../Components/Common";
import { categoriesLaboratory } from "../../utils";

const Laboratory = (props) => {
  const hooks = useLaboratory(props);

  return (
    <Box style={{ width: "100%" }}>
      <Container
        {...hooks}
        {...props}
        screenInital={"information"}
        categories={categoriesLaboratory}
        isLaboratory
      />
    </Box>
  );
};

export default Laboratory;
