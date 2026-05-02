import styled from "styled-components";
import { Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Left, MenuBtn, Right } from "./styles";

export default function Header({ setOpen }) {
  const { user } = useAuth();

  return (
    <Container>
      <Left>
        <MenuBtn onClick={() => setOpen(true)}>
          <Menu size={20} />
        </MenuBtn>
        <h3>Macrofauna</h3>
      </Left>

      <Right>
        <span>{user?.email}</span>
      </Right>
    </Container>
  );
}
