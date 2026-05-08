function BigName({ text }) {
  return (
    <div className="bigname">
      <div className="bigname-track">
        {[0, 1, 2].map((i) => (
          <span key={i}>{text.split(' ')[0]} <em>{text.split(' ')[1]}</em> ◆ </span>
        ))}
      </div>
    </div>
  )
}

export default BigName
