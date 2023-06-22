
import React from 'react';

function ChildComponent(props:  any) {
  return <div>{props.render()}</div>;
}

function ComponentPattern() {
  const propValue = 'Hello from Parent';

  return (
    <ChildComponent render={() => propValue} />
  );
}

export default ComponentPattern;
