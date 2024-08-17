import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: 'black', 
          strokeWidth: 2, 
          strokeDasharray: '4 2', 
        }}
      />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: '2px 5px',
          }}
          className="nodrag nopan"
          onClick={(e) => {
            e.stopPropagation();
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          ❌
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
