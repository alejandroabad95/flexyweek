import { Paper, Typography } from '@mui/material';

const PlannerPage = () => {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {/* Encabezado de los días */}
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">L</Typography>
      </Paper>
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">M</Typography>
      </Paper>
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">X</Typography>
      </Paper>
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">J</Typography>
      </Paper>
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">V</Typography>
      </Paper>
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">S</Typography>
      </Paper>
      <Paper variant="elevation" style={{ minWidth: '80px', display: 'inline-block', marginRight: '10px' }}>
        <Typography variant="subtitle1" align="center">D</Typography>
      </Paper>
    </div>
  );
};

export default PlannerPage;
