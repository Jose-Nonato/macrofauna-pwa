import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  padding: 32px 20px;
`;

export const Right = styled.div`
  flex: 1;
  background-image: url("/Homem_ribeirinho_do_estado.jpeg");
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .logos {
    margin-top: 24px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;

    img {
      max-width: 90px;
      max-height: 50px;
      object-fit: contain;
    }

    .cesupa {
      max-width: 110px;
    }

    .cirad {
      max-width: 100px;
    }

    .goeld {
      max-width: 80px;
    }

    .soborne {
      max-width: 80px;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;

    .logos {
      gap: 16px;

      img {
        max-width: 70px;
        max-height: 40px;
      }
    }
  }
`;

export const Title = styled.p`
  text-align: center;
  margin: 0;
  font-weight: bold;
  font-size: 22px;
  color: #131923;
`;

export const Input = styled.input`
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #14663b;
  }
`;

export const Button = styled.button`
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #14663b;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #131923;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Link = styled.span`
  text-align: center;
  cursor: pointer;
  color: #14663b;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Logo = styled.img`
  width: 140px;
  margin: 0 auto 10px;
  display: block;

  @media (max-width: 768px) {
    width: 110px;
  }
`;
