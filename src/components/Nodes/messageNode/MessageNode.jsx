import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  TextField,
} from '@mui/material';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import imageCompression from 'browser-image-compression';


const updateMessageInNodeData = (nodeId, updatedMessages) => {
  // This function should handle updating the messages in your state or backend
  console.log(`Updating node ${nodeId} with messages:`, updatedMessages);
};

export default function MessageNode({ id, data }) {
  const [state, setState] = useState({
    messages: [],
    showInput: false,
    newInputValue: "",
    editingIndex: null,
    uploadedImage: null,
    uploadedDocument: null,
    uploadedVideo: null,
    isEditingDefault: false,
    defaultText: "",
    anchorEl: null,
  });

  const newInputRef = useRef(null);

  const addMessage = () => {
    setState((prevState) => ({ ...prevState, showInput: true, newInputValue: "" }));
  };

  const handleMessageChange = (e) => {
    setState((prevState) => ({ ...prevState, newInputValue: e.target.value }));
  };

  const handleMessageBlur = () => {
    if (state.newInputValue.trim()) {
      const updatedMessages = [...state.messages, state.newInputValue];
      setState((prevState) => ({ ...prevState, messages: updatedMessages, showInput: false, newInputValue: "" }));
      updateMessageInNodeData(id, updatedMessages);
    } else {
      setState((prevState) => ({ ...prevState, showInput: false, newInputValue: "" }));
    }
  };

  const handleMessageClick = (index) => {
    setState((prevState) => ({ ...prevState, editingIndex: index }));
  };

  const handleInputDelete = (index) => {
    const updatedMessages = state.messages.filter((_, i) => i !== index);
    setState((prevState) => ({ ...prevState, messages: updatedMessages }));
    updateMessageInNodeData(id, updatedMessages);
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'image') {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
        try {
          const compressedFile = await imageCompression(file, options);
          const imageUrl = URL.createObjectURL(compressedFile);
          setState((prevState) => ({ ...prevState, uploadedImage: imageUrl }));
        } catch (error) {
          console.error("Error compressing the image:", error);
        }
      } else if (type === 'document') {
        const documentUrl = URL.createObjectURL(file);
        setState((prevState) => ({ ...prevState, uploadedDocument: documentUrl }));
      } else if (type === 'video') {
        const videoUrl = URL.createObjectURL(file);
        setState((prevState) => ({ ...prevState, uploadedVideo: videoUrl }));
      }
    }
  };

  const handleDoubleClick = () => {
    setState((prevState) => ({ ...prevState, isEditingDefault: true }));
  };

  const handleDefaultTextChange = (e) => {
    setState((prevState) => ({ ...prevState, defaultText: e.target.value }));
  };

  const handleDefaultTextBlur = () => {
    setState((prevState) => ({ ...prevState, isEditingDefault: false }));
    // Here you can also trigger an update to save the text in the backend or state
  };

  const handleMenuClick = (event) => {
    setState((prevState) => ({ ...prevState, anchorEl: event.currentTarget }));
  };

  const handleMenuClose = () => {
    setState((prevState) => ({ ...prevState, anchorEl: null }));
  };

  const handleDelete = () => {
    data.onDeleteNode(id);
    handleMenuClose();
  };

  const handleCopy = () => {
    data.onCopyNode(id);
    handleMenuClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newInputRef.current && !newInputRef.current.contains(event.target)) {
        handleMessageBlur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.newInputValue]);

  return (
    <>
      <Card sx={{ maxWidth: 345, padding: 0, position: 'relative', borderRadius: '10px' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'rgb(233, 91, 105)',
          color: '#fff',
          padding: '8px 5px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1
        }}>
          <IconButton size="small" style={{ color: '#fff', marginRight: '8px' }}>
            <MapsUgcOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
           
          </Typography>
          <IconButton aria-label="settings" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleCopy}>Copy</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>

        <CardContent style={{ marginTop: '30px' }}>
          {state.isEditingDefault ? (
            <TextField
              fullWidth
              variant="outlined"
              value={state.defaultText}
              onChange={handleDefaultTextChange}
              onBlur={handleDefaultTextBlur}
              autoFocus
            />
          ) : (
            <p onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
            { id}
            </p>
          )}

          <Typography variant="body2" color="text.secondary" component="div">
            {state.messages.map((msg, index) => (
              <div key={index} style={{ position: 'relative', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p
                    className="custom-node-message"
                    onClick={() => handleMessageClick(index)}
                    style={{ flexGrow: 1, cursor: 'pointer' }}
                  >
                    {msg}
                  </p>
                  <IconButton
                    size="small"
                    style={{ color: '#f00' }}
                    onClick={() => handleInputDelete(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            ))}
            {state.showInput && (
              <div ref={newInputRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={state.newInputValue}
                  onChange={handleMessageChange}
                  onBlur={handleMessageBlur}
                  autoFocus
                  className="custom-node-message-input"
                />
              </div>
            )}
            {state.uploadedImage && (
              <div style={{ marginTop: '20px' }}>
                <img src={state.uploadedImage} alt="Uploaded" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
              </div>
            )}
            {state.uploadedDocument && (
              <div style={{ marginTop: '20px' }}>
                <a href={state.uploadedDocument} target="_blank" rel="noopener noreferrer">
                  <Button startIcon={<DescriptionIcon />} size="small">Document</Button>
                </a>
              </div>
            )}
            {state.uploadedVideo && (
              <div style={{ marginTop: '20px' }}>
                <video width="100" height="100" controls>
                  <source src={state.uploadedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={addMessage}>Add Message</Button>
          <Button size="small" onClick={() => document.getElementById('image-upload').click()}>Upload Image</Button>
          <Button size="small" onClick={() => document.getElementById('document-upload').click()}>Upload Document</Button>
          <Button size="small" onClick={() => document.getElementById('video-upload').click()}>Upload Video</Button>
          <input
            type="file"
            id="image-upload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image')}
          />
          <input
            type="file"
            id="document-upload"
            style={{ display: 'none' }}
            accept=".pdf, .doc, .docx"
            onChange={(e) => handleFileUpload(e, 'document')}
          />
          <input
            type="file"
            id="video-upload"
            style={{ display: 'none' }}
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'video')}
          />
        </CardActions>
      </Card>
      <Handle type="target" position={Position.Top} style={{ borderRadius: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 0 }} />
    </>
  );
}
