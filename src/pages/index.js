import { Grid } from "@mui/material";
import Home from "@/components/Home/Home";

export default function Index() {
  return (
    <>
      <Grid container display="flex" justifyContent="center" width="100%" sx={{ overflow: 'hidden' }}>
          <Home />
      </Grid>
    </>
  );
}
