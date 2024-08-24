import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import MessageNode from './components/Nodes/messageNode/MessageNode.jsx';
import ParentNode from './components/Nodes/parentChild/ParentNode.jsx';
import CustomEdge from './components/Edges/CustomEdge.jsx';
import nodesData from './data/nodes.js';
import initialEdges from './data/edges.js';
import Sidebar from './components/dashboard/Sidebar.jsx';
import ChildNode from './components/Nodes/parentChild/ChildNode.jsx';


const rfStyle = {
  backgroundColor: '#f5f5f5',
};

function App() {
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowInstance = useRef(null);

  const transformedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      type: node.custom_type || node.type,
    }));
  }, [nodes]);

  const nodeTypes = useMemo(
    () => ({
      customNode: MessageNode,
      parentNode: ParentNode,
      childNode: ChildNode,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      customEdge: CustomEdge,
    }),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const updateNodeTree = (nodes,sourceNode, sourceNodeId, targetNodeData) => {
    return nodes.map((node) => {
      if (node.id === sourceNodeId) {
        const isParentNode = sourceNode.type === 'parentNode';

        return {
          ...node,
          bot_terminate: false,
          next_node: isParentNode
            ? {
                context: {
                  type: 'childNode',
                  childNode: [
                    {
                      id: sourceNode.id,
                      title: sourceNode.label,
                      
                    },
                  ],
                },
              }
            : {
                id: targetNodeData.id,
                type: targetNodeData.type,
              },
        };
      }

      if (node.next_node) {
        return {
          ...node,
          next_node: updateNodeTree([node.next_node], sourceNodeId, targetNodeData),
        };
      }

      if (node.context && Array.isArray(node.context.childNode)) {
        return {
          ...node,
          context: {
            ...node.context,
            childNode: updateNodeTree(node.context.childNode, sourceNodeId, targetNodeData),
          },
        };
      }

      return node;
    });
  };

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        const updatedEdges = applyEdgeChanges(changes, eds);
        const removedEdges = changes.filter((change) => change.type === 'remove');

        const removedEdgeIds = removedEdges.map((edge) => [edge.source, edge.target]).flat();

        const updatedNodes = nodes.map((node) => {
          if (node.type === 'parentNode') {
            const contextArray = Array.isArray(node.context) ? node.context : [];
            const updatedContext = contextArray.filter(
              (contextNode) => !removedEdgeIds.includes(contextNode.id)
            );
            return {
              ...node,
              context: updatedContext,
              bot_terminate: updatedContext.length === 0,
            };
          }
          return node;
        });

        setNodes(updatedNodes);
        console.log('Updated Nodes after Edge Removal:', updatedNodes);
        return updatedEdges;
      });
    },
    [nodes]
  );

  const onConnect = useCallback((connection) => {
    setEdges((eds) => {
      const sourceNodeId = connection.source;
      const targetNodeId = connection.target;

      const sourceNode = nodes.find((node) => node.id === sourceNodeId);
      const targetNode = nodes.find((node) => node.id === targetNodeId);

      if (sourceNode && targetNode) {
        const targetNodeData = {
          id: targetNodeId,
          type: targetNode.custom_type || targetNode.type,
        };

        const updatedNodes = updateNodeTree(nodes,sourceNode, sourceNodeId, targetNodeData);

        console.log('Source Node ID:', sourceNodeId);
        console.log('Target Node Data:', targetNodeData);
        console.log('Updated Nodes Tree:', updatedNodes);

        setNodes(updatedNodes);
      }

      const updatedEdges = addEdge({ ...connection, type: 'customEdge' }, eds);
      console.log('Updated Edges:', updatedEdges);

      return updatedEdges;
    });
  }, [nodes]);

  const onDeleteNode = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    },
    []
  );

  const onCopyNode = useCallback(
    (id) => {
      setNodes((nds) => {
        const nodeToCopy = nds.find((node) => node.id === id);
        if (nodeToCopy) {
          const newId = `${id}-${nds.length}`;
          const newNode = { ...nodeToCopy, id: newId, position: { x: nodeToCopy.position.x + 10, y: nodeToCopy.position.y + 10 } };
          return [...nds, newNode];
        }
        return nds;
      });
    },
    []
  );

  const addNodeToGraph = (type) => {
    const newId = `new-node-${Date.now()}`;
    const newNode = {
      id: newId,
      type,
      label: `${type} Node`,
      position: { x: Math.random() * 800, y: Math.random() * 600 },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const mappedNodes = transformedNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onDeleteNode: () => onDeleteNode(node.id),
      onCopyNode: () => onCopyNode(node.id),
    }
  }));

  useEffect(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView({ padding: 0.1, offset: { x: 0, y: 0 } });
    }
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <Sidebar onAddNode={addNodeToGraph} />
        <div style={{ flexGrow: 1 }}>
          <ReactFlow
            nodes={mappedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            style={rfStyle}
            attributionPosition="top-right"
          >
            <Background />
            <Controls />
            <MiniMap
              nodeColor="#00ff00"
              nodeStrokeWidth={3}
            />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
