import styled from 'styled-components';
import { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';

import { getDate, getDay, getMonth } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

registerLocale('pt', pt);

const Datepicker = ({ feriados, diasSemana, handleData, valor, className }) => {
  const [startDate, setStartDate] = useState();

  const isWeekday = date => {
    //determinando os dias de funcionamento
    let diaInicio = 0;
    let diaFim = diasSemana[diasSemana.length - 1];

    //caso a clínica atenda de domingo também
    if (diasSemana[diasSemana.length - 1] === 8) {
      diaFim = 9;
    }

    const month = getMonth(date) + 1;
    const day = getDate(date);
    const weekDay = getDay(date);

    //filtrando os feriados
    let isFeriado = false;
    feriados.map(feriado => {
      if (day == feriado[0] && month == feriado[1]) {
        isFeriado = true;
      }
    });

    return weekDay !== diaInicio && weekDay !== diaFim && !isFeriado;
  };

  useEffect(() => {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    setStartDate(amanha);
  }, []);

  return (
    <DatePicker
      onChange={date => handleData(date)}
      selected={valor}
      minDate={startDate}
      filterDate={isWeekday}
      showDisabledMonthNavigation
      locale="pt"
      placeholderText="Selecione uma data"
      className={className}
    />
  );
};

export default Datepicker;
