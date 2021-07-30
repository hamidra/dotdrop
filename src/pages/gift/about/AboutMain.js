import { Container } from 'react-bootstrap';
import Footer from '../footer/Footer';
import Header from '../header/Header';

import FAQ from './FAQ';
import ProcessExplainerCard from './ProcessExplainerCard';
import { useSubstrate } from '../../../substrate-lib';

export default function AboutMain() {
  const { giftTheme } = useSubstrate();

  return (
    <div id="about-page">
      <Header />
      <Container className="d-flex flex-column align-items-center pb-5">
        <div style={{ paddingBottom: '4rem' }}>
          <h1 className="py-5 text-center" style={{ fontSize: '3.5rem' }}>
            There's No Better Gift than {giftTheme?.content}
          </h1>
          <p
            className="text-center text-large pb-5"
            style={{ maxWidth: '920px' }}>
            Gift {giftTheme?.content} to your friends and have them join the {giftTheme?.network} community
            today. Simply wrap your DOT gift in a unique secret and share it
            with someone close to you!
          </p>
        </div>
        <ProcessExplainerCard giftTheme={giftTheme} />
        <FAQ giftTheme={giftTheme} />
      </Container>
      <Footer className="bg-solid" />
    </div>
  );
}
