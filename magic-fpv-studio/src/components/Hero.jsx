export default function Hero({ title, subtitle }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
