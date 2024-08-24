import { Card, CardActions, IconButton, Button } from '@mui/material';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

export default function MessageNodeTemplate({ data }) {
  return (
    <>
      <Card sx={{
        maxWidth: '100%',
        padding: 0,
        position: 'relative',
        borderRadius: '10px',
        margin: '10px',
        '@media (min-width:600px)': {
          maxWidth: 345,
        },
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          backgroundColor: 'rgb(233, 91, 105)', 
          color: '#fff', 
          padding: '8px 16px', 
          display: 'flex', 
          alignItems: 'center',
          zIndex: 1 
        }}>
          <IconButton size="small" style={{ color: '#fff', marginRight: '8px' }}>
            <MapsUgcOutlinedIcon />
          </IconButton>
        </div>

        <CardActions style={{
          display: 'flex',
          justifyContent: 'space-around', /* Evenly space out the buttons */
          padding: '8px 16px',
          marginTop: '54px',
          flexWrap: 'wrap', /* Allow buttons to wrap on smaller screens */
        }}>
          <Button size="small" sx={{ flex: '1 1 40%', margin: '4px' }}>Message</Button>
          <Button size="small" sx={{ flex: '1 1 40%', margin: '4px' }}>Image</Button>
          <Button size="small" sx={{ flex: '1 1 40%', margin: '4px' }}>Document</Button>
          <Button size="small" sx={{ flex: '1 1 40%', margin: '4px' }}>Video</Button>
        </CardActions>
      </Card>
    </>
  );
}
