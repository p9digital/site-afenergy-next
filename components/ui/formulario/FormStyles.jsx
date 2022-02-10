import styled from 'styled-components';
import Button from '../buttons/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &.form-encontrar {
    border: solid 1px ${props => props.theme.client.colors.azul};
    border-radius: 50px;

    padding: 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &.form-selectencontrar {
    border: solid 1px ${props => props.theme.client.colors.azul};
    border-radius: 10px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &.form-contato {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media (max-width: 900px) {
      align-items: center;
    }
  }

  &.form-agendamento {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
    border-radius: 15px;

    max-width: 40rem;

    box-shadow: ${props => props.theme.boxShadows.stronger};
    background: ${props => props.theme.client.colors.brancoForm};

    @media (max-width: 450px) {
      width: 100%;
      max-width: 32rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 400px) {
      max-width: initial;
      width: calc(100% + 4rem);
      margin: 0 -2rem;

      div {
        width: 100%;
      }
    }
  }

  &.form-veiculos {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem;
    border-radius: 0;

    @media (max-width: 768px) {
      padding: 0;
    }
    @media (max-width: 500px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      div{
        width: 100%;
      }
    }
  }
`;

export const FormButton = styled(Button)`
  padding: 1rem 4rem;

  &.button-contato {
    width: 100%;
    justify-content: center;
  }
`;

export const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StatusWrapper = styled.div`
  background-color: #fff;
  box-shadow: ${props => props.theme.boxShadows.stronger};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
  min-width: 300px;
  max-width: 400px;
  border-radius: 1.5rem;
  padding: 2rem;

  p {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    strong {
      color: ${props => props.theme.client.colors.marrom};
    }
  }
`;
