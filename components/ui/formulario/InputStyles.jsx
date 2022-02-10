import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;

  .select-input {
    width: 90%;
    border: none;
    border-radius: 10px;
    background-color: #fff;
    height: 4.5rem;
    padding-left: 1rem;

    :disabled {
      cursor: not-allowed;
    }

    &--tiny {
      max-width: 10rem;
      width: 6rem;
      @media (max-width: 768px) {
        width: 90%;
        max-width: initial;
        min-width: 23rem;
      }
    }

    &--medium {
      min-width: 23rem;
    }

    &--city_size {
      min-width: 36rem;
      @media (max-width: 600px) {
        width: 90%;
        max-width: initial;
        min-width: 28rem;
      }
    }

    &--unity_size {
      min-width: 32rem;
      @media (max-width: 600px) {
        width: 90%;
        max-width: initial;
        min-width: 28rem;
      }
    }

    &--erro {
      box-shadow: 0px 0px 3px 2px red;
    }

    &--home {
      background-color: transparent;
      border: 2px solid ${props => props.theme.client.colors.azul};
      border-radius: 10px;
      color: ${props => props.theme.client.colors.azul};

      ::placeholder {
        color: ${props => props.theme.client.colors.azul};
      }
    }
    &--veiculos {
      background-color: transparent;
      color: ${props => props.theme.client.colors.azul};
      border: 2px solid ${props => props.theme.client.colors.azul};
      border-radius: 10px;

      margin-bottom: 1rem;

      ::placeholder {
        color: ${props => props.theme.client.colors.azul};
      }

      @media (max-width: 500px) {
        width: 100%;
        min-width: initial;
        max-width: initial;
      }
    }
    &--home-etapa2 {
      min-width: 28rem;
      margin-bottom: 1rem;
    }
    &--uf-home {
      background-color: ${props => props.theme.client.colors.azul};
      border: 2px solid ${props => props.theme.client.colors.branco};
      border-radius: 10px;
      color: ${props => props.theme.client.colors.branco};
    }
    &--contato {
      background-color: transparent;
      border-radius: 15px;
      border: 0.5px solid ${props => props.theme.client.colors.azul};
      color: ${props => props.theme.client.colors.azul};

      width: 100%;
      margin-bottom: 1rem;
      min-width: 40rem;

      @media (max-width: 400px) {
        min-width: 32rem;
      }
    }
    &--encontrar {
      background-color: transparent;
      border-radius: 0;
      color: ${props => props.theme.client.colors.azul};

      width: 100%;
      padding: 0;
      min-width: 40rem;

      @media (max-width: 768px) {
        min-width: 100%;
      }
    }
    &--agendamento {
      background-color: #fff;
      border-radius: 10px;
      color: ${props => props.theme.client.colors.azul};

      width: 100%;
      min-width: 36rem;
      padding-left: 1rem;
      margin-bottom: 1rem;

      @media (max-width: 450px) {
        width: 90%;
        max-width: initial;
        min-width: 28rem;
      }
      @media (max-width: 400px) {
        width: 100%;
        min-width: initial;
        max-width: initial;
      }

      &.tiny {
        min-width: initial;
        max-width: 10rem;
        @media (max-width: 450px) {
          width: 90%;
          max-width: initial;
          min-width: 28rem;
        }
        @media (max-width: 400px) {
          width: 100%;
          min-width: initial;
          max-width: initial;
        }
      }
      &.medium {
        min-width: initial;
        max-width: 25rem;
        margin-left: 3rem;
        @media (max-width: 450px) {
          width: 90%;
          margin-left: 0;
          max-width: initial;
          min-width: 28rem;
        }
        @media (max-width: 400px) {
          width: 100%;
          min-width: initial;
          max-width: initial;
        }
      }
    }
  }

  .text-area {
    font-family: 'Open sans', sans-serif;
    font-size: 16px;
    padding: 1rem;
    margin-top: 0.5rem;

    border-radius: 10px;
    height: 10rem;

    :disabled {
      cursor: not-allowed;
    }

    &--cinza {
      border: 0.5px solid ${props => props.theme.colors.lightGrey};
    }

    &--erro {
      box-shadow: 0px 0px 3px 2px red;
    }
    &--sucess {
      box-shadow: 0px 0px 2px 1px #71d946;
    }
    &--home {
      background-color: transparent;
      border: 0.5px solid #353535;
      border-radius: 30px;
      color: #353535;
    }
    &--contato {
      background-color: transparent;
      border-radius: 15px;
      border: 0.5px solid ${props => props.theme.client.colors.azul};
      color: ${props => props.theme.client.colors.azul};

      min-width: 40rem;

      @media (max-width: 400px) {
        min-width: 32rem;
      }
    }
  }
`;

export const TextAreaGroup = styled(InputGroup)``;

export const SelectGroup = styled(InputGroup)``;
