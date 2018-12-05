import React, { Component, useState, useEffect } from "react";

import './styles.css'


// Reasons for hooks
// feature to use state and other React features without writing a class
// Classes are hard to understand
// Complex components are complex
// -- lifecycle methods have too much logic mixed
// -- inside of the lifecyle method. bad abstraction

// usecase
// realized you need to add some state to a component (no longer necessary to convert to class)

// Rules of Hooks
// 2 rules
// 1. Only call Hooks at the Top level
// -- don't call Hooks inside loops, conditions, or nested fxn
// 2. Only call hooks from react fxns
// -- don't call hooks from regular js fxns
// -- you can call hooks from react fxn components
// -- you can call call hooks from custom hooks
// there is an eslint plugin for this
// https://reactjs.org/docs/hooks-rules.html


// State Hook - maintaining component state
// Effect Hook - think if you might use component did mount
// Custom Hooks - think some repeated logic (typically a side effect or mutations like subscribing to the same data)

// StateHook
function CounterFunc() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Func. You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

class CounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }

  }

  setCount = (newCount) => {
    this.setState({count : newCount})
  }

  render() {
    return (
      <div>
        <p>Class. You clicked {this.state.count} times</p>
        <button onClick={() => this.setCount(this.state.count + 1)}>Click me</button>
      </div>
    );
  }
}

  // EffectHook
  // to perform side effects in function components
  function CounterEffectHook() {
    const [count, setCount] = useState(0)

    // Data fetching, setting up a subscription, and 
    // manually changing the DOM in React components are 
    // all examples of side effects. Whether or not 
    // you’re used to calling these operations “side 
    // effects” (or just “effects”), you’ve likely 
    // performed them in your components before.
    // you can think of useEffect Hook as componentDidMount, 
    // componentDidUpdate, and componentWillUnmount combined
    // another way is to think of telling React that your component
    // needs to do something after the render
    // the reason it's in the function is so that
    // we can already have access to it in the the fxn scope
    // useEffect happens async unlike componentDidMount or componentDidUpdate
    function updateTitle() {
      document.title = `you clicked ${count} times`;
      
      // if you return a fxn, React will run when it is time to clean up
      // usecase - unsubscribe
      // runs when component unmounts
      // can just be an arrow fxn
      return function cleanup() {
        setTimeout(() => {
          document.title = `cleaning up clicked ${count} times`;    
        }, 5000)
      }
    }

    // you can skip effects by pass array of values
    // will only run if any of those array of values change
    // useEffect(() => {
    //   document.title = `You clicked ${count} times`;
    // }, [count]);
    // avoid passing empty array - run effect and clean up only once
    useEffect(updateTitle);

    return (
      <div>
      <p>EffectHook You clicked times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      </div>
    )
  }

  // the count value just updates by 1 every 3 seconds
  const API = {
    count: 0
  }
  
  setInterval(() => {
    console.log("the api is updating count")
    API.count = API.count + 1
  }, 3000);

  function useData() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      // every 4 seconds, it check the "API"
      setInterval(() => {
        console.log("use data is checking")
        setCount(API.count)
      }, 4000)
    })

    return count;
  }

  // pulled out some share state logic 
  function AComponent() {
    const count = useData()
  
    return (
     <div>
       <div>
        the A component count is {count}
       </div>
     </div> 
    )
  }

  function BComponent() {
    const count = useData()

    return (
      <div>
        <div>
          the B component count is {count}
        </div>
      </div>
    )
  }

  // you can have multiple useState, useEffect
  // now you can separate logic from the lifecycle methods
  // into their own useState, useEffect

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>WTF is a hook?</h1>
        <div className="row state-hook" >
          State Hook
          <CounterFunc />
          <CounterClass />
        </div>
        <div className="row effect-hook">
          Effect Hook
          <CounterEffectHook />
        </div>
        <div className="row custom-hook">
          Custom Hook
          <AComponent />
          <BComponent />
        </div>
      </div>
    );
  }
}

export default App;


// React relies on the order in which Hooks are called
// looks like this is the approach to setting up component
// https://reactjs.org/docs/hooks-rules.html#explanation
// function Form() {
//   // 1. Use the name state variable
//   const [name, setName] = useState('Mary');

//   // 2. Use an effect for persisting the form
//   useEffect(function persistForm() {
//     localStorage.setItem('formData', name);
//   });

//   // 3. Use the surname state variable
//   const [surname, setSurname] = useState('Poppins');

//   // 4. Use an effect for updating the title
//   useEffect(function updateTitle() {
//     document.title = name + ' ' + surname;
//   });

//   // ...
// }


// Custom Hook
// usecase - when we want to share logic between 2 js fxn,
// we extract it to a third func. 
// the fxn name starts with useBlah
// function useBlah() {

// }
// function useFriendStatus(friendID) {
//   const [isOnline, setIsOnline] = useState(null);
  
//   // ...

//   return isOnline;
// }
// you can define states inside the custom hook and have useEffects in there


// From bluecore end where does this seems useful
// we can definitely use for those components where we might need some internal state
// so effect hooks and state hooks will be immediately useful
// custom hooks - what is the use case for that? I think for shared state, but for that case, redux library will be better for that
// and it shouldn't be for state (it should be for reuse stateful logic
// (such as setting up a subscription and remembering the current value), 
// but every time you use a custom Hook, all state and effects inside of it are fully isolated.)

// https://reactjs.org/docs/hooks-faq.html
