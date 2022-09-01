import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const ElasticCarousel = ({ children, breakPoints }) => (
  <CarouselStyled pagination={false} breakPoints={breakPoints}>
    {children}
  </CarouselStyled>
);

const CarouselStyled = styled(Carousel)`
  position: relative;
  .rec-arrow {
    position: absolute;

    width: 25px;
    height: 25px;
    min-width: initial;
    line-height: 1;

    font-size: 18px;
    text-align: center;

    border-radius: 5px;
    color: #fff;
    z-index: 1;
    padding: 0;
    margin: 0;

    background-color: ${(props) => props.theme.client.colors.azul};
    &:hover {
      background-color: ${(props) => props.theme.client.colors.azul};
    }
    &:focus {
      background-color: ${(props) => props.theme.client.colors.azul};
      color: #fff
    }
    &:disabled {
      color: rgba(0, 0, 0, 0.2);
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .rec-arrow-left {
    left: 25px;
  }
  .rec-arrow-right {
    right: 25px;
  }
`;

export default ElasticCarousel;
