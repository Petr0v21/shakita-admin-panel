import styled from 'styled-components';

export const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .row {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .dashboard-pie {
    width: 300px;
  }
  @media (max-width: 740px) {
    .optional-statistic {
      width: 320px;
    }
  }
`;
