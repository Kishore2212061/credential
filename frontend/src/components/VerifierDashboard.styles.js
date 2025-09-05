import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 20px;
`;

export const CompanyCard = styled.div`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);

  h2 {
    margin: 0 0 10px;
    font-size: 1.5rem;
  }

  p {
    margin: 4px 0;
    font-size: 0.95rem;
  }
`;

export const Timer = styled.div`
  margin-top: 12px;
  font-weight: bold;

  span {
    background: rgba(255,255,255,0.2);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .expired {
    background: #ef4444;
    color: #fff;
  }
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
`;

export const StudentCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  h4 {
    margin: 0 0 6px;
    font-size: 1.1rem;
    color: #333;
  }

  p {
    margin: 2px 0;
    font-size: 0.9rem;
    color: #555;
  }
`;

export const BackButton = styled.button`
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #4f46e5;
  }
`;

export const DetailCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  h2 {
    margin-bottom: 12px;
    color: #111;
  }

  p {
    margin: 4px 0;
    font-size: 0.95rem;
    color: #444;
  }

  strong {
    color: #111;
  }
`;
