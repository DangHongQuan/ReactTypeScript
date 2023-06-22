

import React from 'react';

function ChildComponent(props: any) {
  return <div>{props.propName}</div>;
}

function ComponentOperator() {
  const props = {
    propName: 'Hello from Parent'
  };

  return <ChildComponent {...props} />;
}

export default ComponentOperator;