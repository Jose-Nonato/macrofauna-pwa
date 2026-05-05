import styled from "styled-components";

export const Container = styled.div``;

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0px;
`;

export const Title = styled.p`
  font-size: medium;
  font-weight: bold;
`;

export const CardSample = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0px;

  .internalCard {
    display: flex;
    flex-direction: row;
  }

  .titleCard {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  img {
    width: 30px;
    background-color: #14663b;
    padding: 5px;
    border-radius: 10px;
  }

  label {
    font-size: 18px;
  }

  span {
    font-size: 14px;
  }

  input {
    width: 10%;
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 5px;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  border: none;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
  background-color: #14663b;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
`;

export const ButtonDisposition = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 50%;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px;
    font-weight: 500;
  }

  button:nth-child(1) {
    background-color: #14663b;
    margin-right: 5px;
    color: #fff;
  }

  button:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }

  button:nth-child(2) {
    background-color: #fff;
    border: 1px solid red;
    color: red;
    margin-left: 5px;
    font-weight: bold;
  }
`;
