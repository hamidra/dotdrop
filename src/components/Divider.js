export default function Divider ({ text }) {
  return (
    <div className="divider d-flex flex-row align-items-center w-100 py-5">
      <div className="d-flex flex-grow-1 border-top"></div>
      <div className="px-3">{text}</div>
      <div className="d-flex flex-grow-1 border-top"></div>
    </div>
  );
}
