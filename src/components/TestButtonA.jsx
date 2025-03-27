import React from "react";
import { Link } from "react-router-dom";

const TestButtonA = ({ text }) => {
  return (
    <div>
      <h2 className="text-2xl btn btn-wide">{text}</h2>
    </div>
  );
};

export default TestButtonA;
