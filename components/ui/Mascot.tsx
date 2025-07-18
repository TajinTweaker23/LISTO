import React, { forwardRef, useImperativeHandle, useRef } from "react";

type MascotProps = {
  action: "idle" | "cheer" | "party";
  // ...any other props
};

const Mascot = forwardRef<any, MascotProps>(({ action }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    cheer: () => {
      // Mascot cheer action (if you want to call from parent)
    },
    party: () => {
      // Mascot party action
    },
    // ...add other actions if needed
  }));

  return (
    <div ref={localRef}>
      {/* Your mascot JSX here. Render based on 'action' */}
      {action === "cheer" ? "🎉" : action === "party" ? "🥳" : "🙂"}
    </div>
  );
});

Mascot.displayName = "Mascot";
export default Mascot;
