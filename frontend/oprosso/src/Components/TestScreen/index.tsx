import React from "react";
import { useParams } from "react-router-dom";

const TestScreen = () => {
  const params = useParams();
  console.log(params);
  return <div>TestScreen</div>;
};

export default TestScreen;
