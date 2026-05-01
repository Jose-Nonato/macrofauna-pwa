import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { showError, showSuccess } from "../../utils/alert";
import {
  Container,
  Left,
  Right,
  Button,
  Form,
  Input,
  Link,
  Title,
  Logo,
} from "./styles";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await register(email, password);
      showSuccess("Conta criada com sucesso!");
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
        <Form onSubmit={handleRegister}>
          <Logo src="/logo_vertical_verde.png" />
          <Title>Crie sua conta</Title>
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
            {loading ? "Criando..." : "Registrar"}
          </Button>
          <Link onClick={() => navigate("/")}>Já tenho conta</Link>
        </Form>
      </Left>
      <Right />
    </Container>
  );
}
