import styled from 'styled-components';
import Button from './Button';

const ButtonSucesso = styled(Button)`
  background: linear-gradient(to bottom, #74d485, #52a036);
  padding: 0.8rem 2rem;
  text-shadow: 0 2px rgba(0, 0, 0, 0.2);
  svg {
    -webkit-filter: drop-shadow(0 2px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 2px rgba(0, 0, 0, 0.2));
  }
  &:disabled {
    background: linear-gradient(to bottom, #e1e1e1, #9e9e9e);
    cursor: not-allowed;
  }
`;

export default ButtonSucesso;
