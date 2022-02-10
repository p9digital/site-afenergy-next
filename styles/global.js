import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
    @media (max-width: 600px) {
      font-size: 9.5px;
    }
  }
  * {
    margin: 0;
    padding: 0;
  }
  *, *:before, *:after{
    box-sizing: inherit;
  }
  body{
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 1.6;
    font-family: "Montserrat",  sans-serif;
    color: ${props => props.theme.colors.greyDarker};
    background: ${props => props.theme.client.colors.brancoEscuro};
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
    cursor: pointer;
  }
  ol, ul {
    list-style: none;
  }
  input,
  select, textarea {
    font-size: 16px;
    outline: none;
    font-family: inherit;
  }
  img{
    height: auto;
    max-width: 100%;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button{
    border: none;
    outline: none;
    line-height: inherit;
    cursor: pointer;
  }

  //estilizando datepicker
  
  //input datepicker
  .date-picker-home{
    width: 90%;
    min-width: 28rem;

    background-color: transparent;
    border: 2px solid ${props => props.theme.client.colors.azul};
    border-radius: 10px;
    color: ${props => props.theme.client.colors.azul};

    height: 4.5rem;
    padding-left: 1rem;
    margin-bottom: 1rem;

    ::placeholder {
      color: ${props => props.theme.client.colors.azul};
    }
    &:hover{
      cursor: pointer;
    }
  }

  .date-picker-agendamento{
    background-color: #fff;
    border-radius: 10px;
    border:none;
    color: ${props => props.theme.client.colors.azul};

    width: 100%;
    padding-left: 1rem;
    margin-bottom: 1rem;
    min-width: 28rem;

    height: 4.5rem;
    padding-left: 1rem;
    margin-bottom: 1rem;

    ::placeholder {
      color: ${props => props.theme.client.colors.azul};
    }
    &:hover{
      cursor: pointer;
    }
  }

  .react-datepicker {
  font-size: 1.3rem !important;
  }
  .react-datepicker__current-month {
    font-size: 1.5rem !important;
  }
  .react-datepicker__header {
    padding-top: 6px !important;
  }
  .react-datepicker__navigation {
    top: 13px !important;
  }
  .react-datepicker__day-name, .react-datepicker__day {
    margin: 0.5rem !important;
  }
`;

export default GlobalStyle;
