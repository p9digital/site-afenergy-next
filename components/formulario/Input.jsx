import PropTypes from 'prop-types';

import { InputGroup } from '../ui/formulario/InputStyles';

const Input = ({
  nome,
  placeholder,
  handleInput,
  valor,
  valido,
  className,
  tipo,
  custom = true,
}) => (
  <InputGroup>
    <input
      id={nome}
      aria-label={nome}
      name={nome}
      value={valor}
      onChange={handleInput}
      className={`select-input ${className} ${
        (!valido && !valor) || !custom ? 'select-input--erro' : ''
      }`}
      placeholder={placeholder}
      type={tipo}
    />
  </InputGroup>
);

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valido: PropTypes.bool.isRequired,
  custom: PropTypes.bool,
  tipo: PropTypes.string,
};

Input.defaultProps = {
  tipo: 'string',
  className: '',
};
