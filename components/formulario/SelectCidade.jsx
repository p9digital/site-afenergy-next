import PropTypes from 'prop-types';
import { SelectGroup } from '../ui/formulario/InputStyles';

const SelectCidade = ({
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
      <option key="0" value="" disabled>
        {carregando === nome ? 'Carregando...' : placeholder}
      </option>
      {valores.map((data) => (
        <option key={data.id} value={data.id}>
          {data.nome}
        </option>
      ))}
    </select>
  </SelectGroup>
);

export default SelectCidade;

SelectCidade.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  valor: PropTypes.string,
  valores: PropTypes.arrayOf(Object).isRequired,
  valido: PropTypes.bool.isRequired,
  carregando: PropTypes.string,
};

SelectCidade.defaultProps = {
  className: '',
  carregando: '',
  valor: ""
};
