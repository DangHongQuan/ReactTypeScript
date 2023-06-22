import React from 'react';

function ChildComponent(props: any) {
  return <div>{props.propName} </div>;
}

function ParentComponent() {
  const propValue = 'Hello from Parent';

  return <ChildComponent propName={propValue} />;
}

export default ParentComponent;
