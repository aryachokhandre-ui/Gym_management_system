import { useState } from "react";
import Nav_bar from "./component/Nav_bar";
import Home from "./component/Home";

function App() {

  const [showTrial, setShowTrial] = useState(false);

  return (
    <>
      <Nav_bar
        onTryFree={() => setShowTrial(true)}
      />

      <Home
        showTrial={showTrial}
        setShowTrial={setShowTrial}
      />
    </>
  );
}

export default App;