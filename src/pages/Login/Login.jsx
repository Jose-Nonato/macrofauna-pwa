import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { showError, showSuccess } from "../../utils/alert";
import {
  Container,
  Left,
  Right,
  Button,
  Input,
  Title,
  Form,
  Link,
  Logo,
} from "./styles";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      showSuccess("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Left>
        <Form onSubmit={handleSubmit}>
          <Logo src="/logo_vertical_verde.png" />
          <Title>Seja bem vindo!</Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <Link onClick={() => navigate("/register")}>Crie sua conta</Link>
        </Form>
      </Left>
      <Right />
    </Container>
  );
}
