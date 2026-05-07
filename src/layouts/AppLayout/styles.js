import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;

  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;
  overflow: hidden;

  background: #f8fafc;
`;

export const Content = styled.div`
  flex: 1;

  overflow-y: auto;
  overflow-x: hidden;

  min-height: 0;

  padding: 24px;
`;
