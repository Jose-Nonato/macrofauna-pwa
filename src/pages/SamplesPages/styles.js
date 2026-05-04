import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  width: auto;
  padding: 10px 20px;
  border-radius: 5px 10px;
  background: #14663b;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;

export const card = {
  padding: 12,
  border: "1px solid #ddd",
  borderRadius: 8,
  marginBottom: 10,
};

export const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "flex-end",
};

export const drawer = {
  width: 420,
  background: "#fff",
  padding: 20,
  overflowY: "auto",
};
