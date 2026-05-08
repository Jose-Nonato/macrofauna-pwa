import styled from "styled-components";

export const Button = styled.button`
  background: #14663b;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;

  .topHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .topHeader h2 {
    margin: 0;
    font-size: 28px;
    color: #111827;
  }

  .topHeader p {
    margin-top: 4px;
    color: #6b7280;
  }

  .filters {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 24px;
    margin-bottom: 28px;

    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
  }

  .filterItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 200px;
  }

  .filterItem label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
  }

  .filterItem input {
    height: 46px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    padding: 0 14px;
    font-size: 14px;
    outline: none;
    transition: 0.2s;
    background: #fff;
    box-sizing: border-box;
  }

  .filterItem input:focus {
    border-color: #14663b;
    box-shadow: 0 0 0 3px rgba(20, 102, 59, 0.1);
  }

  .clearFilters {
    height: 46px;
    margin-top: 28px;
    padding: 0 18px;

    border: none;
    border-radius: 10px;

    background: #ef4444;
    color: #fff;

    font-weight: 600;
    cursor: pointer;

    transition: 0.2s;
  }

  .clearFilters:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 16px;

    .filters {
      padding: 18px;
    }

    .filterItem {
      min-width: 100%;
    }

    .clearFilters {
      width: 100%;
      margin-top: 0;
    }
  }
`;

export const SampleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;

  .card {
    flex: 0 0 calc((100% - 20px) / 2);
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 20px;
    box-sizing: border-box;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    transition: 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
  }

  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .cardTitle {
    display: flex;
    align-items: center;
    gap: 8px;

    margin: 0;

    font-size: 18px;
    color: #111827;
  }

  .country {
    margin-top: 4px;
    color: #6b7280;
    font-size: 14px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .infoRow {
    display: flex;
    align-items: center;
    gap: 10px;

    color: #374151;
    font-size: 15px;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .editBtn,
  .removeBtn {
    border: none;
    border-radius: 8px;
    padding: 10px 14px;

    color: #fff;

    cursor: pointer;
    font-weight: 600;

    transition: 0.2s;
  }

  .editBtn {
    background: #14663b;
  }

  .removeBtn {
    background: #dc2626;
  }

  .editBtn:hover,
  .removeBtn:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .card {
      flex: 0 0 100%;
    }

    .cardHeader {
      flex-direction: column;
    }

    .actions {
      width: 100%;
    }

    .editBtn,
    .removeBtn {
      flex: 1;
    }
  }
`;

export const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 999,
};

export const drawer = {
  width: "100%",
  maxWidth: "600px",
  height: "100%",
  background: "#fff",
  padding: "24px",
  overflowY: "auto",
};
