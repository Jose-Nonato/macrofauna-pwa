import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  flex: 1;
  background-image: url("https://images.unsplash.com/photo-1500382017468-9049fed747ef");
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.p`
  text-align: center;
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 18px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #1e293b;
  color: white;
  cursor: pointer;

  &:hover {
    background: #131923;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Link = styled.span`
  text-align: center;
  cursor: pointer;
  color: #1e293b;

  &:hover {
    text-decoration: underline;
  }
`;

export const Logo = styled.img`
  width: 120px;
  margin: 0 auto;
  display: block;
`;
