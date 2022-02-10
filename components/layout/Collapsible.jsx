import styled from 'styled-components';
import Icon from '../ui/icons/Icon';
import { useState } from 'react';
import Paragraph from '../ui/tipografia/Paragraph';

const FaqWrapper = styled.div`
  width: 100%;
  padding: 0;

  margin-bottom: 2rem;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
`;

const Question = styled.div`
  background-color: #d8d8d8;
  width: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 3rem;

  @media (max-width: 500px) {
    padding: 1rem 2rem;
  }
`;

const Answer = styled.div`
  border: solid 4px #d8d8d8;
  padding: 3rem;
`;

const Collapsible = ({ children, pergunta }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <FaqWrapper>
      <Question onClick={handleFilterOpening}>
        <Paragraph>{pergunta}</Paragraph>
      </Question>
      {isOpen && (
        <Answer>
          <Paragraph>{children}</Paragraph>
        </Answer>
      )}
    </FaqWrapper>
  );
};

export default Collapsible;
