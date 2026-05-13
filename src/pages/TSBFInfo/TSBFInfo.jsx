import {
  Container,
  Hero,
  Section,
  CardGrid,
  Card,
  StepContainer,
  Step,
  Badge,
} from "./styles";

export default function TSBFInfo() {
  return (
    <Container>
      <Hero>
        <Badge>Método TSBF</Badge>

        <h1>Amostragem da Macrofauna do Solo</h1>

        <p>
          O método TSBF (Tropical Soil Biology and Fertility) é um protocolo
          internacionalmente reconhecido para avaliação da macrofauna edáfica e
          da qualidade biológica do solo.
        </p>
      </Hero>

      <Section>
        <h2>Objetivo</h2>

        <p>
          O método busca identificar organismos presentes no solo capazes de
          indicar alterações ambientais, fertilidade e equilíbrio ecológico.
        </p>

        <CardGrid>
          <Card>
            <h3>Qualidade do Solo</h3>
            <p>
              Avalia o equilíbrio ecológico através da biodiversidade presente.
            </p>
          </Card>

          <Card>
            <h3>Indicadores Biológicos</h3>
            <p>
              Utiliza organismos como minhocas, formigas e besouros como
              bioindicadores.
            </p>
          </Card>

          <Card>
            <h3>Monitoramento Ambiental</h3>
            <p>Permite comparar áreas preservadas, degradadas e agrícolas.</p>
          </Card>
        </CardGrid>
      </Section>

      <Section>
        <h2>Como realizar a coleta</h2>

        <StepContainer>
          <Step>
            <span>1</span>

            <div>
              <h3>Escolha da Área</h3>

              <p>
                Selecione um ponto representativo da área de estudo evitando
                locais com interferência recente.
              </p>
            </div>
          </Step>

          <Step>
            <span>2</span>

            <div>
              <h3>Demarcação</h3>

              <p>
                Delimite um monólito de 25cm x 25cm com profundidade de até
                30cm.
              </p>
            </div>
          </Step>

          <Step>
            <span>3</span>

            <div>
              <h3>Coleta Manual</h3>

              <p>
                Remova cuidadosamente os organismos encontrados na serapilheira
                e no solo.
              </p>
            </div>
          </Step>

          <Step>
            <span>4</span>

            <div>
              <h3>Identificação</h3>

              <p>
                Classifique os organismos conforme os grupos taxonômicos
                disponíveis na aplicação.
              </p>
            </div>
          </Step>

          <Step>
            <span>5</span>

            <div>
              <h3>Registro Fotográfico</h3>

              <p>
                Tire fotos nas quatro direções (Norte, Sul, Leste e Oeste) para
                documentar a área.
              </p>
            </div>
          </Step>

          <Step>
            <span>6</span>

            <div>
              <h3>Cálculo do IQMS</h3>

              <p>
                O sistema calculará automaticamente densidade e índice de
                qualidade da macrofauna do solo.
              </p>
            </div>
          </Step>
        </StepContainer>
      </Section>

      <Section>
        <h2>Principais grupos encontrados</h2>

        <CardGrid>
          <Card>
            <h3>Minhocas</h3>
            <p>
              Melhoram a estrutura do solo e aumentam a infiltração de água.
            </p>
          </Card>

          <Card>
            <h3>Formigas</h3>
            <p>Auxiliam na ciclagem de nutrientes e movimentação do solo.</p>
          </Card>

          <Card>
            <h3>Cupins</h3>
            <p>Atuam na decomposição de matéria orgânica lignificada.</p>
          </Card>

          <Card>
            <h3>Besouros</h3>
            <p>Importantes predadores e decompositores da fauna edáfica.</p>
          </Card>
        </CardGrid>
      </Section>

      <Section>
        <h2>Interpretação do IQMS</h2>

        <CardGrid>
          <Card>
            <h3>0.75 - 1.00</h3>
            <p>Excelente qualidade biológica do solo.</p>
          </Card>

          <Card>
            <h3>0.50 - 0.74</h3>
            <p>Boa qualidade biológica.</p>
          </Card>

          <Card>
            <h3>0.25 - 0.49</h3>
            <p>Qualidade intermediária com sinais de degradação.</p>
          </Card>

          <Card>
            <h3>0.00 - 0.24</h3>
            <p>Baixa qualidade biológica e possível degradação severa.</p>
          </Card>
        </CardGrid>
      </Section>
    </Container>
  );
}
