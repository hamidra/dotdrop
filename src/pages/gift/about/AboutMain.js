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
          <h1 className="about-heading pt-5 pb-4 text-center">
            The easiest way to send {giftTheme?.content}
            <br />
            to friends and family
          </h1>
          <p
            className="text-center text-large pb-5"
            style={{ maxWidth: '920px' }}
          >
            Share your love of {giftTheme?.network} with friends and family and
            help onboard them to the network.&nbsp;
            {giftTheme?.network} Gifts lets you send {giftTheme?.content} to
            anyone, even if they don’t already have a {giftTheme?.network}{' '}
            account.
          </p>
        </div>
        <ProcessExplainerCard giftTheme={giftTheme} />
        <FAQ giftTheme={giftTheme} />
      </Container>
      <Footer className="bg-solid" />
    </div>
  );
}
