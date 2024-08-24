import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Typography, TextField, Box, Menu, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/Reply';
import ChildNode from './ChildNode';
import { Handle } from 'reactflow';

export default function ParentNode({ id, data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Click to edit me!");
  const [anchorEl, setAnchorEl] = useState(null);
  const textRef = useRef(null);

  const handleStyleLeft = { left: -10 }; 
  const handleStyleRight = { right: -10 };

  

  // Directly define child nodes data
  const childrens = [
    {
      id: "I",
      
        label: 'Yes'
      
    },
    {
      id: "II",
   
        label: 'No'
     
    }
  ];

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    data.onDeleteNode(id);
    handleMenuClose();
  };

  const handleCopy = () => {
    data.onCopyNode(id);
    handleMenuClose();
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        sx={{ bgcolor: "rgb(255, 153, 51)" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <ReplyIcon />
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleCopy}>Copy</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent>
        <p>{id}</p>
        <Box mb={2}>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              value={text}
              onChange={handleTextChange}
              onBlur={handleBlur}
              autoFocus
              inputRef={textRef}
            />
          ) : (
            <Typography variant="body1" onClick={handleTextClick}>
              {text}
            </Typography>
          )}
        </Box>
        <Box mt={2}>
          {childrens.map((node, index) => (
            <ChildNode key={node.id} id={node.id} label={node.label} index={index} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
