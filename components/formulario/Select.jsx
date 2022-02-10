import PropTypes from 'prop-types';
import { SelectGroup } from '../ui/formulario/InputStyles';

const Select = ({
  nome,
  placeholder,
  handleInput,
  valor,
  valores,
  valido,
  className,
  carregando,
}) => (
  <SelectGroup>
    <select
      aria-label={nome}
      name={nome}
      value={valor}
      onChange={handleInput}
      placeholder={placeholder}
      className={`select-input ${className} ${
        !valido && !valor ? 'select-input--erro' : ''
      }`}
    >
      <option>{carregando === nome ? 'Carregando...' : placeholder}</option>
      {valores.map((data) => (
        <option key={data} value={data}>
          {data}
        </option>
      ))}
    </select>
  </SelectGroup>
);

export default Select;

Select.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  valor: PropTypes.string.isRequired,
  valores: PropTypes.arrayOf(Object).isRequired,
  valido: PropTypes.bool.isRequired,
  carregando: PropTypes.string,
};

Select.defaultProps = {
  className: '',
  valorPersonalizado: false,
  carregando: '',
};
