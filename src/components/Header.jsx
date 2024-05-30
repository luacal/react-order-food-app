import logoImage from '../assets/logo.jpg';

export default function Header({onCartOpen}) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="Logo image" />
        <h1>REACT FOOD</h1>
      </div>
      <button className="text-button" onClick={onCartOpen}>Cart (3)</button>
    </header>
  );
}
