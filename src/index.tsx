import { createRoot } from "react-dom/client";

import { MainExample } from "./MainExample";
import {
  SimpleComponentWithState,
  SimpleComponent,
  SimplestComponent
} from "./SimpleComponent";
import { StateExample } from "./StateExample";
import { SimplePractice } from "./SimplePractice";
import { DifficultPracticeSolved } from "./DifficultPracticeSolved";
import { DifficultPractice } from "./DifficultPractice";
import { SimplePracticeSolved } from "./SimplePracticeSolved";
import { GetSnapshotBeforeUpdateExample } from "./GetSnapshotBeforeUpdateExample";
import { GetDerivedStateFromPropsExample } from "./GetDerivedStateFromPropsExample";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// root.render(<SimplestComponent />);
// root.render(<StateExample />);
// root.render(<SimpleComponentWithState />);
// root.render(<MainExample />);
// root.render(<GetSnapshotBeforeUpdateExample />);
root.render(<GetDerivedStateFromPropsExample />);
// root.render(<DifficultPractice />);
// root.render(<DifficultPracticeSolved />);
// root.render(<SimplePractice />);
// root.render(<SimplePracticeSolved />);
