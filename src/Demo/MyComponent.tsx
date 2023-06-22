import React from 'react';

function MyComponent() {
  // Mảng
  const myArray = ['Apple', 'Banana', 'Orange','Apple', 'Banana', 'Orange'];

  // Đối tượng
  const myObject = {
    name: 'John',
    age: 30,
    city: 'New York',
  };

  return (
    <div>
      <h2>Mảng:</h2>
      <ul>
        {/* Lặp qua các phần tử của mảng */}
        {myArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Đối tượng:</h2>
      <p>Name: {myObject.name}</p>
      <p>Age: {myObject.age}</p>
      <p>City: {myObject.city}</p>
    </div>
  );
}

export default MyComponent;
