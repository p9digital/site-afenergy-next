import PropTypes from 'prop-types';
import { InputGroup } from '../ui/formulario/InputStyles';

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: 'R$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput = ({
  nome,
  placeholder,
  handleInput,
  valor,
  valido,
  className,
  tipo,
  custom = true,
}) => {
  const currencyMask = createNumberMask(defaultMaskOptions);
  return (
    <InputGroup>
      <MaskedInput
        mask={currencyMask}
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
};

export default CurrencyInput;

CurrencyInput.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valido: PropTypes.bool.isRequired,
  tipo: PropTypes.string.isRequired,
  custom: PropTypes.bool,
};

CurrencyInput.defaultProps = {
  className: '',
};
