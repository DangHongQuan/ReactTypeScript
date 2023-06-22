import React, { createContext, useContext } from 'react';

const MyContext = createContext('default value');

function ParentComponent() {
  const propValue = useContext(MyContext);
  return <div>{propValue}</div>;
}

function ComponentContext() {
  const propValue = 'Hello from ĐHQ';

  return (
    <MyContext.Provider value={propValue}>
      <ParentComponent />
    </MyContext.Provider>
  );
}

export default ComponentContext;
