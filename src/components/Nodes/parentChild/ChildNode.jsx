import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Button } from '@mui/material';

const handleStyleLeft = { left: -10 }; 
const handleStyleRight = { right: -10 };

export default function ChildNode({ label, index }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        position: 'relative', 
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyleLeft}
        id={`left-handle-${index}`} 
      />

      <Button color="primary" onClick={onChange}>
        {label || 'Child Node'}
      </Button>

      <Handle
        type="source"
        position={Position.Right}
        style={handleStyleRight}
        id={`right-handle-${index}`} 
      />
    </Box>
  );
}
