// Sidebar.jsx
import React from 'react';
import MessageNodeTemplate from '../Nodes/messageNode/MessageNodeTemplate.jsx';
import ParentNodeTemplate from '../Nodes/parentChild/ParentNodeTemplate';
import './Sidebar.css';

const Sidebar = ({ onAddNode }) => {
    
  const handleAddMessageNode = () => {
    onAddNode('customNode');
  };

  const handleAddParentNode = () => {
    onAddNode('parentNode');
  };

  return (
    <div className="sidebar">
      <div className="card_p" onClick={handleAddMessageNode}>
        <MessageNodeTemplate />
      </div>
      <div className="card_p" onClick={handleAddParentNode}>
        <ParentNodeTemplate />
      </div>
    </div>
  );

  
};



export default Sidebar;
