import styled from "styled-components";

export const Container = styled.div`
  margin-top: 32px;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
`;

export const UploadCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e2e8f0;

  h4 {
    margin-top: 0;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 12px;

    button {
      flex: 1;
      border: none;
      background: #166534;
      color: white;
      border-radius: 10px;
      padding: 12px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      cursor: pointer;
    }
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  margin-top: 16px;
`;

export const PreviewCard = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;

    width: 28px;
    height: 28px;

    border: none;
    border-radius: 50%;

    background: rgba(0, 0, 0, 0.7);
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }
`;
