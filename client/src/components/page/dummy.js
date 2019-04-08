import Landing from "./Landing";

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

//Landing.js

<div className="card">
  {studentid === this.props.studentid && (
    <Button
      className="remove-btn"
      color="danger"
      size="sm"
      onClick={this.onDeleteClick.bind(this, _id)}
    >
      &times;
    </Button>
  )}
  <div className="card-body">
    <h3 className="card-title">{studentid}</h3>
    <p className="card-text">{feedback}</p>
  </div>
</div>;

<Grid item sm>
  <h1>Recent polls</h1>
  <TrendingUp fontSize="large" />

  <Paper style={this.style2}>
    <PollLanding studentid={this.state.userid} />
  </Paper>
</Grid>;
