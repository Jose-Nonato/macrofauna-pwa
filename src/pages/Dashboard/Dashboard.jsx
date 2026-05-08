import { useEffect, useMemo, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";
import { getSamples, getAllInsects } from "../../services/SamplesServices";

const COLORS = {
  good: "#22c55e",
  regular: "#facc15",
  mediocre: "#fb923c",
  bad: "#ef4444",
};

const SPECIES = [
  { key: "earthworm", label: "Minhoca" },
  { key: "ant", label: "Formiga" },
  { key: "isoptera", label: "Cupim" },
  { key: "blattaria", label: "Barata" },
  { key: "coleoptera", label: "Besouro" },
  { key: "arachnida", label: "Aranha" },
  { key: "diplopoda", label: "Diplópode" },
  { key: "chilopoda", label: "Quilópode" },
  { key: "hemiptera", label: "Percevejo" },
  { key: "dermaptera", label: "Tesourinha" },
  { key: "lepidoptera", label: "Lagarta" },
  { key: "gasteropoda", label: "Molusco" },
  { key: "others", label: "Outros" },
];

export default function Dashboard() {
  const [samples, setSamples] = useState([]);
  const [insects, setInsects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    startDate: "",
    endDate: "",
  });

  async function loadDashboard() {
    try {
      setLoading(true);

      const [samplesData, insectsData] = await Promise.all([
        getSamples(),
        getAllInsects(),
      ]);

      setSamples(samplesData || []);
      setInsects(insectsData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      country: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
    });
  }

  const filteredSamples = useMemo(() => {
    return samples.filter((sample) => {
      const countryMatch =
        !filters.country ||
        sample.country?.toLowerCase().includes(filters.country.toLowerCase());

      const stateMatch =
        !filters.state ||
        sample.state?.toLowerCase().includes(filters.state.toLowerCase());

      const cityMatch =
        !filters.city ||
        sample.city?.toLowerCase().includes(filters.city.toLowerCase());

      const sampleDate = new Date(sample.created_at);

      const startDateMatch =
        !filters.startDate || sampleDate >= new Date(filters.startDate);

      const endDateMatch =
        !filters.endDate ||
        sampleDate <= new Date(filters.endDate + "T23:59:59");
      return (
        countryMatch &&
        stateMatch &&
        cityMatch &&
        startDateMatch &&
        endDateMatch
      );
    });
  }, [samples, filters]);

  const filteredInsects = useMemo(() => {
    const filteredIds = filteredSamples.map((sample) => sample.id);

    return insects.filter((insect) => filteredIds.includes(insect.sample_id));
  }, [insects, filteredSamples]);

  const averageIQMS = useMemo(() => {
    if (!filteredSamples.length) return 0;
    const total = filteredSamples.reduce(
      (sum, sample) => sum + Number(sample.sample_score || 0),
      0,
    );
    return Number((total / filteredSamples.length).toFixed(2));
  }, [filteredSamples]);

  const classificationData = useMemo(() => {
    let good = 0;
    let regular = 0;
    let mediocre = 0;
    let bad = 0;
    filteredSamples.forEach((sample) => {
      const value = Number(sample.sample_score || 0);
      if (value >= 0.75) good++;
      else if (value >= 0.5) regular++;
      else if (value >= 0.25) mediocre++;
      else bad++;
    });
    return [
      {
        name: "Bom",
        value: good,
        color: COLORS.good,
      },
      {
        name: "Regular",
        value: regular,
        color: COLORS.regular,
      },
      {
        name: "Medíocre",
        value: mediocre,
        color: COLORS.mediocre,
      },
      {
        name: "Ruim",
        value: bad,
        color: COLORS.bad,
      },
    ];
  }, [filteredSamples]);
  const speciesData = useMemo(() => {
    const totals = {};
    SPECIES.forEach((s) => {
      totals[s.key] = 0;
    });
    filteredInsects.forEach((insect) => {
      SPECIES.forEach((s) => {
        totals[s.key] += Number(insect[s.key] || 0);
      });
    });
    const totalInsects = Object.values(totals).reduce(
      (sum, value) => sum + value,
      0,
    );
    return SPECIES.map((s) => ({
      specie: s.label,
      quantity: totals[s.key],
      percentage:
        totalInsects > 0
          ? ((totals[s.key] / totalInsects) * 100).toFixed(1)
          : 0,
    }));
  }, [filteredInsects]);
  if (loading) {
    return <div style={{ padding: 20 }}>Carregando dashboard...</div>;
  }
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <h1>Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 16,
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div>
          <label>País</label>
          <input
            type="text"
            name="country"
            placeholder="Digite o país"
            value={filters.country}
            onChange={handleFilterChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Estado</label>
          <input
            type="text"
            name="state"
            placeholder="Digite o estado"
            value={filters.state}
            onChange={handleFilterChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Cidade</label>
          <input
            type="text"
            name="city"
            placeholder="Digite a cidade"
            value={filters.city}
            onChange={handleFilterChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Data Inicial</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Data Final</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <button onClick={clearFilters} style={clearButtonStyle}>
            Limpar
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            minHeight: 320,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Média Geral IQMS</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[
                {
                  value: averageIQMS * 100,
                },
              ]}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={20} fill="#22c55e" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fill: "#111827",
                }}
              >
                {averageIQMS}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            minHeight: 320,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Classificação das Amostras</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={classificationData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {classificationData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h3>Representação das Espécies</h3>
        <div
          style={{
            overflowX: "auto",
            marginTop: 20,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f3f4f6",
                  textAlign: "left",
                }}
              >
                <th style={th}>Espécie</th>
                <th style={th}>Quantidade</th>
                <th style={th}>Representação</th>
              </tr>
            </thead>
            <tbody>
              {speciesData.map((item) => (
                <tr key={item.specie}>
                  <td style={td}>{item.specie}</td>

                  <td style={td}>{item.quantity}</td>

                  <td style={td}>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h3>Distribuição das Espécies</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={speciesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="specie" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" radius={[8, 8, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const th = {
  padding: 14,
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: 14,
  borderBottom: "1px solid #f3f4f6",
};

const inputStyle = {
  width: "100%",
  marginTop: 6,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d1d5db",
};

const clearButtonStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "#ef4444",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};
