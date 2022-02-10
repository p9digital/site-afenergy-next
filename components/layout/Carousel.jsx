import styled from 'styled-components';
import Icon from '../ui/icons/Icon';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function Carousel({ children }) {
  return (
    <CarouselProvider
      totalSlides={10}
      infinite={true}
      isIntrinsicHeight={true}
    >
      <Slider>{children}</Slider>
      <ButtonBack className="button-back">
        <Icon icon="arrow_left" cor="#353535" tamanho="8rem" tipo="svg" />
      </ButtonBack>
      <ButtonNext className="button-next">
        <Icon icon="arrow_right" cor="#353535" tamanho="8rem" tipo="svg" />
      </ButtonNext>
    </CarouselProvider>
  );
}
