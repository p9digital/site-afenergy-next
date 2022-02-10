import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { celularMask, telefoneMask } from '../../helpers/masks';

import { InputGroup } from '../ui/formulario/InputStyles';

const InputMasked = ({
  nome,
  placeholder,
  handleInput,
  valor,
  valido,
  className,
  tipo,
  mask,
  custom,
}) => (
  <InputGroup>
    {mask === 'tel/cel' && (
      <MaskedInput
        mask={(value) => (value.length > 14 ? celularMask : telefoneMask)}
        aria-label={nome}
        name={nome}
        value={valor}
        onChange={handleInput}
        className={`select-input ${className} ${
          valor.length > 0 && valor.length >= 14 && custom
            ? ''
            : !valido || (valor.length > 0 && valor.length < 14) || !custom
              ? 'select-input--erro'
              : ''
        }`}
        placeholder={placeholder}
        type={tipo}
        guide={false}
      />
    )}
    {mask !== 'tel/cel' && (
      <MaskedInput
        mask={mask}
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
    )}
  </InputGroup>
);

export default InputMasked;

InputMasked.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valido: PropTypes.bool.isRequired,
  mask: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  custom: PropTypes.bool.isRequired,
};

InputMasked.defaultProps = {
  className: '',
};
