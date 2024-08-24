import React from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/Reply';

export default function ParentNode({ id }) {
  return (
    <Card sx={{
     
      borderRadius: '10px',
    }}>
      <CardHeader
        sx={{ bgcolor: "rgb(255, 153, 51)" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <ReplyIcon />
          </Avatar>
        }
       
      />
      <CardContent>
       
        <Box >
          <Typography  variant="body1">
            Template
          </Typography>
        </Box>
        
        <Box sx={{
          gap: '8px',
          }}>
          <Button size="small" sx={{ width: '100%', maxWidth: '120px' }} color="primary">
            Yes
          </Button>
          
          <Button size="small" sx={{ width: '100%', maxWidth: '120px' }} color="primary">
            No
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
