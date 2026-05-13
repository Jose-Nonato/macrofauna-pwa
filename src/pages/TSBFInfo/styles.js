import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  padding: 32px;
`;

export const Hero = styled.div`
  background: linear-gradient(135deg, #54a676 0%, #15803d 100%);

  border-radius: 28px;

  padding: 48px;

  color: white;

  h1 {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    max-width: 800px;
    line-height: 1.7;
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    padding: 32px 24px;

    h1 {
      font-size: 2rem;
    }
  }
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.15);

  margin-bottom: 20px;

  font-weight: 600;
`;

export const Section = styled.section`
  margin-top: 48px;

  h2 {
    font-size: 2rem;
    margin-bottom: 24px;
    color: #0f172a;
  }

  p {
    line-height: 1.7;
    color: #475569;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;

  margin-top: 24px;
`;

export const Card = styled.div`
  background: white;

  border-radius: 20px;

  padding: 24px;

  border: 1px solid #e2e8f0;

  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    margin-top: 0;
    color: #54a676;
  }

  p {
    margin-bottom: 0;
  }
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 32px;
`;

export const Step = styled.div`
  display: flex;
  gap: 20px;

  background: white;

  padding: 24px;

  border-radius: 20px;

  border: 1px solid #e2e8f0;

  span {
    width: 48px;
    height: 48px;

    min-width: 48px;

    border-radius: 50%;

    background: #54a676;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    font-size: 1.2rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
