import styled, { StyledComponent } from 'styled-components';
import { useRouter } from 'next/router';
import NavbarHome from './NavbarHome';
import NavHeader from './NavHeader';
import Footer from './Footer';

const LayoutStyled = styled.div``;
const Content = styled.main``;

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <LayoutStyled>
      <NavHeader />
      <NavbarHome />
      <Content>{children}</Content>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;
