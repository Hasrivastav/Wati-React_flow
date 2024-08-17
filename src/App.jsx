import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MessageNode from "./components/Nodes/messageNode/MessageNode.jsx";
import ParentNode from "./components/Nodes/parentChild/ParentNode.jsx";
import ChildNode from "./components/Nodes/parentChild/ChildNode.jsx";
import QuestionNode from "./components/Nodes/Question/QuestionNode.jsx";
import CustomEdge from "./components/Edges/CustomEdge.jsx";
import initialNodes from "./data/nodes.js";
import initialEdges from "./data/edges.js";

const rfStyle = {
  backgroundColor: "#f5f5f5",
};

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const nodeTypes = useMemo(
    () => ({
      customNode: MessageNode,
      parentNode: ParentNode,
      childNode: ChildNode,
      questionNode: QuestionNode,
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

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'customEdge' }, eds)),
    []
  );

  // const onDeleteNode = useCallback(
  //   (id) => {
  //     setNodes((nds) => nds.filter((node) => node.id !== id));
  //     setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  //   },
  //   []
  // );

  // const onCopyNode = useCallback(
  //   (id) => {
  //     setNodes((nds) => {
  //       const nodeToCopy = nds.find((node) => node.id === id);
  //       if (nodeToCopy) {
  //         const newId = `${id}-${nds.length}`; 
  //         const newNode = { ...nodeToCopy, id: newId, position: { x: nodeToCopy.position.x + 10, y: nodeToCopy.position.y + 10 } }; 
  //         return [...nds, newNode];
  //       }
  //       return nds;
  //     });
  //   },
  //   []
  // );

  
  const mappedNodes = nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      // onDeleteNode: () => onDeleteNode(node.id),
      // onCopyNode: () => onCopyNode(node.id),
    }
  }));

  return (
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
  );
}

export default App;
