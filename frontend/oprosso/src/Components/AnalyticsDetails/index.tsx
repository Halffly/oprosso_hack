import React from "react";
import { useParams } from "react-router-dom";

const AnalyticsDetails = () => {
  const params = useParams();
  console.log(params);
  return <div>AnalyticsDetails</div>;
};

export default AnalyticsDetails;
