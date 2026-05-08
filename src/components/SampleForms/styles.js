import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 24px;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;

    h2 {
      font-size: 24px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;

    h2 {
      font-size: 22px;
    }
  }
`;

export const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;

  .field {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
  }

  input {
    height: 46px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    padding: 0 14px;
    background: #f9fafb;
    color: #111827;
    font-size: 15px;
    transition: 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #14663b;
    box-shadow: 0 0 0 3px rgba(20, 102, 59, 0.15);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 22px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 18px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    padding: 14px;
    border-radius: 16px;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 18px;
    text-align: center;
  }
`;

export const SamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CardSample = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0px;

  padding: 14px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  background: #fafafa;

  .internalCard {
    display: flex;
    align-items: center;
  }

  .titleCard {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    min-width: 0;
  }

  img {
    width: 58px;
    height: 58px;
    object-fit: contain;
    background-color: #14663b;
    padding: 10px;
    border-radius: 14px;
    transition: 0.2s ease;
    flex-shrink: 0;
  }

  img:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  label {
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    word-break: break-word;
  }

  span {
    font-size: 13px;
    color: #6b7280;
    margin-top: 4px;
    line-height: 1.4;
  }

  input {
    width: 110px;
    min-width: 110px;
    height: 44px;
    border: 1px solid #d1d5db;
    padding: 0 12px;
    border-radius: 12px;
    font-size: 15px;
    transition: 0.2s ease;
    background: #fff;
  }

  input:focus {
    outline: none;
    border-color: #14663b;
    box-shadow: 0 0 0 3px rgba(20, 102, 59, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    .internalCard {
      width: 100%;
    }

    input {
      width: 100%;
      min-width: 100%;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;

    img {
      width: 50px;
      height: 50px;
    }

    label {
      font-size: 15px;
    }

    span {
      font-size: 12px;
    }
  }
`;

export const AddButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 5px;
  padding: 15px;
  border-radius: 14px;
  background-color: #14663b;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 14px;
    font-size: 14px;
  }
`;

export const ButtonDisposition = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  button {
    flex: 1;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    padding: 13px;
    font-weight: 600;
    font-size: 15px;
    transition: 0.2s ease;
  }

  button:nth-child(1) {
    background-color: #14663b;
    color: #fff;
  }

  button:nth-child(1):hover {
    opacity: 0.92;
  }

  button:disabled {
    background-color: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
    opacity: 0.7;
  }

  button:nth-child(2) {
    background-color: #fff;
    border: 1px solid #ef4444;
    color: #ef4444;
    font-weight: 700;
  }

  button:nth-child(2):hover {
    background: #fef2f2;
  }

  @media (max-width: 640px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backdropFilter: "blur(5px)",
  padding: "16px",
};

export const modalStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "24px",
  width: "100%",
  maxWidth: "650px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  position: "relative",
};

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: #f3f4f6;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: 0.2s ease;
    flex-shrink: 0;
  }

  button:hover {
    background: #e5e7eb;
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 20px;
    }

    button {
      width: 36px;
      height: 36px;
    }
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 18px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    max-height: 220px;
    border-radius: 14px;
  }
`;

export const ModalDescription = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.7;
  }
`;

export const ModalNavigation = styled.div`
  display: flex;
  gap: 10px;

  button {
    flex: 1;
    border: none;
    border-radius: 14px;
    padding: 13px;
    background: #14663b;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
  }

  button:hover {
    opacity: 0.92;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;
