import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, TextField, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'; 
import { Handle, Position } from '@xyflow/react'; 


const handleStyleLeft = { left: -10 };
const handleStyleRight = { right: -10 };

function QuestionNode({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.default ||"");
  const textRef = useRef(null);


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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.Title}
       
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
        id={`left-handle-${data}`} 
      />
      
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyleRight}
        id={`right-handle-${data}`} 
      />
    </Card>
  );
}

export default QuestionNode;
