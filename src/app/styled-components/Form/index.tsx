import styled from 'styled-components';

export const StyledForm = styled.div`
  .main-info {
    display: flex;
    flex-direction: column;
    margin-left: 1em;
  }
  .form-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;
  }
  .form-column {
    display: flex;
    flex-direction: column;
  }
  form {
    max-width: 640px;
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    .conteiner-file-input {
      margin: 0 90px;
    }
  }
  .form-container-bonus {
    display: flex;
    align-items: flex-end;
    gap: 4em;
  }
  @media (max-width: 720px) {
    .form-container-bonus {
      gap: 2em;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
  }
`;
