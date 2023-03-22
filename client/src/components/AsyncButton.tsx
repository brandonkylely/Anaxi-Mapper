import React from "react";
import { useState } from "react";

const AsyncButton = (props: any) => {
  const [loading, setLoading] = useState(false);

  return (
    <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      // don't forget to make your onClick async!
      onClick={async (e) => {
        if (props.onClick) {
          // This is the only reliable way to check if a function is asynchronous
          const onClickIsPromise =
            props.onClick.constructor.name === "AsyncFunction";
          // We only set loading if the function is actually async
          // to avoid useless re-renders
          if (onClickIsPromise) setLoading(true);
          // We can await onclick even if it's not asynchronous
          // it won't change its behavior
          await props.onClick(e);
          if (onClickIsPromise) setLoading(false);
        }
      }}
    >
      {loading ? props.loadingChildren : props.children}
    </button>
  );
};

export default AsyncButton;