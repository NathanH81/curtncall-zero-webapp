import React, { useState, useCallback } from "react";
import { useStore } from "./store";
import { animated, useTransition } from "react-spring";

const pages = [
  (props: { style: any }) => (
    <animated.div className="curtain" style={{ ...props.style }}>
      CurtnCall
    </animated.div>
  ),
  (props: { style: any }) => (
    <animated.div className="background" style={{ ...props.style }}>
      CurtnCall
    </animated.div>
  )
];

const App: React.FC = () => {
  const [index, set] = useState(0);
  const onClick = useCallback(() => set(state => (state === 0 ? 1 : 0)), []);

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: "translate3d(0,100%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,100%,0)" }
  });

  return (
    <div className="background-wrapper" onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        return <Page key={key} style={props} />;
      })}
    </div>
  );

  // return (
  //   <div className="background-wrapper">

  //     <animated.div className="curtain" style={props}></animated.div>
  //     {/* <div className="background"></div> */}
  //   </div>
  // );
};

export default App;
