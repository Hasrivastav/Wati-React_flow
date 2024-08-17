const nodes = [
    {
      id: "A",
      type: "parentNode",
      data: {
        Title: "Start Booking",
        default: "Would you like to book a flight?",
        childrens: [
          {
            id: "B",
            type: "childNode",
            data: { label: "Yes" },
            position: { x: 150, y: 100 },
            parentId: "A",
            extent: "parent",
          },
          {
            id: "C",
            type: "childNode",
            data: { label: "No" },
            position: { x: 350, y: 100 },
            parentId: "A",
            extent: "parent",
          },
        ],
      },
      position: { x: 200, y: 50 },
    },
  
    {
      id: "D",
      type: "customNode",
      data: {
        default: "Please enter details of destination",
        Title: "Destination",
        message: [],
      },
      position: { x: 200, y: 700 },
    },
  
    {
      id: "E",
      type: "parentNode",
      data: {
        default: "Available  booking dates",
        Title: "Travel Dates",
        childrens: [
            {
              id: "p-2-1",
              type: "childNode",
              data: { label: "9-September-2024" },
              position: { x: 150, y: 100 },
              parentId: "E",
              extent: "parent",
            },
            {
              id: "p-2-2",
              type: "childNode",
              data: { label: "12-September-2024" },
              position: { x: 350, y: 100 },
              parentId: "E",
              extent: "parent",
            },
          ],
      },
      position: { x: 600, y: 300 },
    },
  
    {
      id: "F",
      type: "parentNode",
      data: {
        default: "Select your flight class",
        Title: "Flight Class",
       
        childrens: [
            {
              id: "p-3-1",
              type: "childNode",
              data: { label: "Economy" },
              position: { x: 150, y: 100 },
              parentId: "F",
              extent: "parent",
            },
            {
              id: "p-3-2",
              type: "childNode",
              data: { label: "Business Class" },
              position: { x: 350, y: 100 },
              parentId: "F",
              extent: "parent",
            },
            {
                id: "p-3-2",
                type: "Business Class",
                data: { label: "First Class" },
                position: { x: 350, y: 100 },
                parentId: "F",
                extent: "parent",
              },
          ],
      },
      position: { x: 1000, y: 300 },
    },
  
    {
      id: "G",
      type: "customNode",
      data: {
        default: "Review your booking details",
        Title: "Review",
        message: [],
      },
      position: { x: 1400, y: 300 },
    },
  
    {
      id: "H",
      type: "questionNode",
      data: {
        Title: "Confirm Booking",
        default: "Are you sure you want to confirm?",
        childrens: [
          {
            id: "I",
            type: "childNode",
            data: { label: "Yes, Confirm" },
            position: { x: 100, y: 100 },
            parentId: "H",
            extent: "parent",
          },
          {
            id: "J",
            type: "childNode",
            data: { label: "No, Go Back" },
            position: { x: 300, y: 100 },
            parentId: "H",
            extent: "parent",
          },
        ],
      },
      position: { x: 1800, y: 300 },
    },
  ];
  
  export default nodes;
  