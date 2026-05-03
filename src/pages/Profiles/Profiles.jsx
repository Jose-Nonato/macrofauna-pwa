import { useEffect, useState } from "react";
import { getProfile, upsertProfile } from "../../services/ProfilesServices";
import { Button, Card, Container, Form, Input, Title } from "./styles";
import { showError, showSuccess } from "../../utils/alert";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    profession: "",
    bachelor: "",
    university: "",
    birth_date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      if (data) {
        setForm((prev) => ({
          ...prev,
          ...data,
          birth_date: data.birth_date ? data.birth_date.split("T")[0] : "",
        }));
      }
    } catch (err) {
      showError(err.message);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await upsertProfile(form);
      showSuccess("Perfil salvo com sucesso!");
    } catch (err) {
      // alert(err.message);
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card>
        <Title>Perfil</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="country"
            placeholder="País"
            value={form.country}
            onChange={handleChange}
          />
          <Input
            name="state"
            placeholder="Estado"
            value={form.state}
            onChange={handleChange}
          />
          <Input
            name="city"
            placeholder="Cidade"
            value={form.city}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
          />
          <Input
            name="profession"
            placeholder="Profissão"
            value={form.profession}
            onChange={handleChange}
          />
          <Input
            name="bachelor"
            placeholder="Graduação"
            value={form.bachelor}
            onChange={handleChange}
          />
          <Input
            name="university"
            placeholder="Universidade"
            value={form.university}
            onChange={handleChange}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
