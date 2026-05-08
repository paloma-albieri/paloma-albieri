function Footer({ copy }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{copy.footer[0]}</p>
        <p>{copy.footer[1]}</p>
        <p>{copy.footer[2]}</p>
      </div>
    </footer>
  )
}

export default Footer
