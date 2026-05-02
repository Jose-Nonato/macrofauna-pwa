import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8fafc;
`;

export const Content = styled.div`
  padding: 24px;
`;
