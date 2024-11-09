import React from "react";
import { SandpackTests } from "@codesandbox/sandpack-react";

export function SandpackTestComponent() {
  return (
    <SandpackTests
      style={{ display: "none" }}
      watchMode={false}
      showWatchButton={false}
      showVerboseButton={false}
      hideTestsAndSupressLogs={true}
    />
  );
}