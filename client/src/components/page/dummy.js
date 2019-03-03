{
  this.state.feedbacks.map(({ studentid, feedback }) => (
    <CSSTransition key={uuid()} timeout={500} classNames="fade">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{studentid}</h3>
          <p className="card-text">{feedback}</p>
        </div>
      </div>
    </CSSTransition>
  ));
}
