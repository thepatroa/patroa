import styled from "styled-components";

export const Container = styled.div`
  background: #1e1e2f;
  border-radius: 12px;
  padding: 24px;
  margin: 16px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  font-family: "Fira Mono", monospace, monospace;
  max-width: 700px;
  color: #e0e0e0;
  border: 1px solid #2e2e42;

  h2 {
    margin-bottom: 16px;
    font-weight: 700;
    color: #61dafb;
    font-size: 1.8rem;
  }

  p {
    margin: 6px 0;
    font-size: 0.95rem;
    line-height: 1.4;

    strong {
      color: #a3a3ff;
      width: 180px;
      display: inline-block;
      text-transform: capitalize;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;