import React from "react";
import styled from "@emotion/styled";

const Texto = styled.div`
  background-color: #b7322c;
  color: #fff;
  padding: 15px;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  font-family: "Latto", sans-serif;
`;

const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};

export default Error;
