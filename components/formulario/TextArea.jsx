import PropTypes from "prop-types";

import { TextAreaGroup } from "../ui/formulario/InputStyles";

const TextArea = ({
  nome,
  placeholder,
  handleInput,
  valor,
  valido,
  className
}) => (
  <TextAreaGroup>
    <textarea
      aria-label={nome}
      name={nome}
      value={valor}
      onChange={handleInput}
      className={`${className} ${!valido && !valor ? "text-area--erro" : ""}`}
      placeholder={placeholder}
    />
  </TextAreaGroup>
);

export default TextArea;

TextArea.propTypes = {
  className: PropTypes.string,
  nome: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valido: PropTypes.bool.isRequired
};

TextArea.defaultProps = {
  className: ""
};
