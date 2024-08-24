import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, TextField, Box, Menu, MenuItem } from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'; 
import { Handle, Position } from '@xyflow/react';

const handleStyleLeft = { left: -10 };
const handleStyleRight = { right: -10 };



function QuestionNode({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState( "questionnode");
  const [anchorEl, setAnchorEl] = useState(null);
  const textRef = useRef(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (data.onDeleteNode) {
      data.onDeleteNode(data.id);  
    }
    handleMenuClose();
  };

  const handleCopy = () => {
    if (data.onCopyNode) {
      data.onCopyNode(data.id);  
    }
    handleMenuClose();
  };

  const handleClickOutside = useCallback((event) => {
    if (textRef.current && !textRef.current.contains(event.target)) {
      setIsEditing(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{ bgcolor: blue[900], color: 'white' }} 
        avatar={
          <IconButton aria-label="question">
            <QuestionMarkIcon sx={{ color: 'white' }} /> 
          </IconButton>
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
        <Box>
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
            <Typography variant="body2" color="text.secondary" onClick={handleTextClick}>
              {text}
            </Typography>
          )}
        </Box>
      </CardContent>

      <Handle
        type="target"
        position={Position.Left}
        style={handleStyleLeft}
         
      />
      
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyleRight}
        
      />
    </Card>

    
  );
}

export default QuestionNode;
