import styled from 'styled-components';

export const StyledListPage = styled.div`
  max-width: 1180px;
  width: 100%;
  .list-filter {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(180px, 300px));
    justify-content: center;
    gap: 1em;
  }
`;
