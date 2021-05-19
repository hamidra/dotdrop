export default function ProcessExplainerCard () {
  return (
    <div
      className='d-flex flex-column align-items-center w-100 p-5'
      style={
          {
            background: 'linear-gradient(74.98deg, #E6007C 0%, #E6007A 36.28%, #7300E6 100%)',
            /* linear-gradient(74.98deg, #E6007C 0%, #E6007A 36.28%, #7300E6 100%) */
            borderRadius: '1.5rem',
            color: '#FFF'
          }
        }
    >
      <h2
        style={{ fontSize: '3.5rem', marginBottom: '7.5rem' }}
      >
        How to Gift DOT
      </h2>
      <div className='d-flex flex-row flex-grow-1 text-center'>
        <div>
            <h3>Create Gift</h3>
            <div>Enter a gift amount and generate a unique gift secret.</div>
        </div>
        <div>
            <h3>Share Gift with Friends and Family</h3>
            <div>Send the unique gift secret to a friend or family member.</div>
        </div>
        <div>
            <h3>Claim Gift</h3>
            <div>The recipient creates a new Polkadot account and claims their gift.</div>
        </div>
      </div>
    </div>
  );
}
