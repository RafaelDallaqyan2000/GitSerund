import { useState } from "react";

export function useForceRender() {
  const [, setValue] = useState(false); // integer state
  return () => setValue(value => !value); // update the state to force render
}
