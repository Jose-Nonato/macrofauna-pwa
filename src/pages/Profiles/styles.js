import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #1e293b;
  color: #fff;
  cursor: pointer;
`;
