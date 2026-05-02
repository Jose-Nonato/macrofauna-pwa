import styled from "styled-components";

export const Container = styled.aside`
  background: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  /* MOBILE */
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    width: 100%;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    transition: 0.3s;
    z-index: 1000;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Close = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Nav = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.button`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: ${({ active }) => (active ? "#1e293b" : "transparent")};
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #1e293b;
  }
`;

export const Footer = styled.div``;

export const LogoutBtn = styled.button`
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
`;

export const MobileOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
  }
`;

export const Logo = styled.img`
  width: 120px;
  margin: 0 auto;
  display: block;
`;
