import styled from "styled-components";

export const Container = styled.header`
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Right = styled.div``;

export const MenuBtn = styled.button`
  display: none;
  border: none;
  background: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
