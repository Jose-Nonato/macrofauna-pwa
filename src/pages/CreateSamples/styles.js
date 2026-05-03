import styled from "styled-components";

export const Container = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const Card = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

export const Input = styled.input`
  padding: 8px;
`;

export const Button = styled.button``;

export const Submit = styled.button`
  background: green;
  color: white;
  padding: 12px;
`;

export const Info = styled.div`
  margin-top: 10px;
`;
