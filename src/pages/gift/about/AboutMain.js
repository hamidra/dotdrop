import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';

import ProcessExplainerCard from './ProcessExplainerCard';

export default function AboutMain () {
  return (
    <>
      <Header />
        <Container className='d-flex flex-column align-items-center py-5'>
          <h1 className='py-5' style={{ fontSize: '3.5rem' }}>There's no Better Gift than DOTs</h1>
          <p className='text-center text-large pb-5'>Gif DOTs to your friends and have them join the Polkadot community today. Simply wrap your DOT gift in a uniqe secret and share it with someone close to you!</p>
          <ProcessExplainerCard />
        </Container>
      <Footer />
    </>
  );
}
