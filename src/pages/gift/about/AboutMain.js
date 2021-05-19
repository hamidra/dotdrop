import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';

import FAQ from './FAQ';
import ProcessExplainerCard from './ProcessExplainerCard';

export default function AboutMain () {
  return (
    <>
      <Header />
        <Container className='d-flex flex-column align-items-center py-5'>
          <div style={{ paddingBottom: '4rem' }}>
            <h1 className='py-5' style={{ fontSize: '3.5rem' }}>There's No Better Gift than DOTs</h1>
            <p className='text-center text-large pb-5' style={{ maxWidth: '920px' }}>Gif DOTs to your friends and have them join the Polkadot community today. Simply wrap your DOT gift in a unique secret and share it with someone close to you!</p>
          </div>
          <ProcessExplainerCard />
          <FAQ />
        </Container>
      <Footer />
    </>
  );
}
