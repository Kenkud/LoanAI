declare module "react-world-flags" {
    import React from "react";
  
    interface FlagProps {
      country?: string; // Ensure the correct prop name
      className?: string;
    }
  
    const FlagComponent: React.FC<FlagProps>;
    export default FlagComponent;
  }
  