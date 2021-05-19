import logo from "./google-logo.png";

function Button(props) {
  return <button className={props.className}>{props.value}</button>;
}

function Content() {
  return (
    <div>
      <img src={                                                     } alt="alt text" width="300px" />
      <Button value="Google Search" className="content-button" />
    </div>
  );
}

function App() {
  return (
    <div>
      <Content />
    </div>
  );
}

export default App;
