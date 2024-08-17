import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import CloseIcon from '@mui/icons-material/Close';
import imageCompression from 'browser-image-compression'; 

const updateMessageInNodeData = (nodeId, updatedMessages) => {
  console.log(`Updating node ${nodeId} with messages:`, updatedMessages);
};

export default function MessageNode({ data }) {
    const [messages, setMessages] = useState(data.message || []);
    const [showInput, setShowInput] = useState(false);
    const [newInputValue, setNewInputValue] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedDocument, setUploadedDocument] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const newInputRef = useRef(null);

    const addMessage = () => {
      setShowInput(true);
      setNewInputValue("");
    };

    const handleMessageChange = (e) => {
      setNewInputValue(e.target.value);
    };

    const handleMessageBlur = () => {
      if (newInputValue.trim()) {
        const updatedMessages = [...messages, newInputValue];
        setMessages(updatedMessages);
        updateMessageInNodeData(data.id, updatedMessages);
      }
      setShowInput(false);
      setNewInputValue("");
    };

    const handleMessageClick = (index) => {
      setEditingIndex(index);
    };

    const handleInputDelete = (index) => {
      const updatedMessages = messages.filter((_, i) => i !== index);
      setMessages(updatedMessages);
      updateMessageInNodeData(data.id, updatedMessages);
    };

    const addImage = () => {
      document.getElementById('image-upload').click();
    };

    const addDocument = () => {
      document.getElementById('document-upload').click();
    };

    const addVideo = () => {
      document.getElementById('video-upload').click();
    };

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        };

        try {
          const compressedFile = await imageCompression(file, options);
          const imageUrl = URL.createObjectURL(compressedFile);
          setUploadedImage(imageUrl);
        } catch (error) {
          console.error("Error compressing the image:", error);
        }
      }
    };

    const handleDocumentUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const documentUrl = URL.createObjectURL(file);
        setUploadedDocument(documentUrl);
      }
    };

    const handleVideoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const videoUrl = URL.createObjectURL(file);
        setUploadedVideo(videoUrl);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (newInputRef.current && !newInputRef.current.contains(event.target)) {
          handleMessageBlur();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [newInputValue]);

    return (
      <>
        <Card sx={{ maxWidth: 345, padding: 0, position: 'relative', borderRadius:'10px' }}>
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
            <Typography variant="h6" component="div">
              {data.Title}
            </Typography>
          </div>

          <CardContent style={{ marginTop: '30px' }}>
            <p>{data.default}</p>
            <Typography variant="body2" color="text.secondary" component="div">
              
              {messages.map((msg, index) => (
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
              {showInput && (
                <div ref={newInputRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={newInputValue}
                    onChange={handleMessageChange}
                    onBlur={handleMessageBlur}
                    className="custom-node-message-input"
                    style={{ width: '100%' }}
                  />
                </div>
              )}
              {uploadedImage && (
                <div style={{ marginTop: '20px' }}>
                  <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                </div>
              )}
              {uploadedDocument && (
                <div style={{ marginTop: '20px' }}>
                  <a href={uploadedDocument} target="_blank" rel="noopener noreferrer">
                    <Button startIcon={<DescriptionIcon />} size="small">Document</Button>
                  </a>
                </div>
              )}
              {uploadedVideo && (
                <div style={{ marginTop: '20px'  }}>
                  <video width="100" height="100" controls>
                    <source src={uploadedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={addMessage}>Message</Button>
            <Button size="small" onClick={addImage}>
           
              Image
            </Button>
            <Button size="small" onClick={addDocument}>
             
              Document
            </Button>
            <Button size="small" onClick={addVideo}>
            
              Video
            </Button>
          </CardActions>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <input
            id="document-upload"
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx" 
            style={{ display: 'none' }}
            onChange={handleDocumentUpload}
          />
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={handleVideoUpload}
          />
        </Card>

        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="source" position={Position.Bottom} id="b" />
      </>
    );
}
