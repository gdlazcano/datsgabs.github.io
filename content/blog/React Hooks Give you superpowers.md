---
title: "React Hooks gives you superpowers"
date: 2022-08-10
draft: false
description: "React Hooks are a great tool for building complex components. But they are also a great tool for building simple components. This article is about the various ways you might want to use Hooks."
tags: ["react"]
keywords:
  [
    "react",
    "hooks",
    "custom hooks",
    "useState",
    "useEffect",
    "useContext",
    "dan abramov",
  ]
tweet_id: 1557404082129833986
---

React Hooks launched a long time ago, but it has now become a core part of React. It is a new way to write components that is much more powerful than the previous version.

It's much better than writting a class component, because you end up with simpler code, less boilerplate, and similar features, much faster.

```jsx
// Class Component
export class ShowCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    this.setState({
      count: this.props.count,
    });
  }

  render() {
    return (
      <div>
        <h1> Count : {this.state.count} </h1>
      </div>
    );
  }
}
```

VS

```jsx
// Using React Hooks
export function ShowCount(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  return (
    <div>
      <h1> Count : {count} </h1>
    </div>
  );
}
```

## Main Hooks

Hooks were introduced in React 16.8.0, so by now most people know at least the basics. But here are some of the main hooks in case you need them:

- [useState](https://es.reactjs.org/docs/hooks-reference.html#usestate)
- [useEffect](https://es.reactjs.org/docs/hooks-reference.html#useeffect)
- [useContext](https://es.reactjs.org/docs/hooks-reference.html#usecontext)
- [useReducer](https://es.reactjs.org/docs/hooks-reference.html#usereducer)
- [useCallback](https://es.reactjs.org/docs/hooks-reference.html#usecallback)
- [useMemo](https://es.reactjs.org/docs/hooks-reference.html#usememo)
- [useRef](https://es.reactjs.org/docs/hooks-reference.html#useref)

## Creating your own Hooks

You can even create your own Hooks and this is highely encouraged. In order to increase code reusability. In this example, we are using other hooks to create a custom hook that you can import anywhere in your code. Mixing other hooks, using other custom hooks inside your custom hook, and so on.

```jsx
// useFetch.jsx
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useFetch;

// App.jsx
import useFetch from "./useFetch";

const Home = () => {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
};
```

## Hook examples

### Global state using useState and useContext

```jsx
// GlobalState.jsx
import { useState, createContext } from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalState = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <GlobalState.Provider value={{ count, setCount }}>
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalStateProvider;

// App.jsx
import GlobalStateProvider from "./GlobalState";
import Home from "./Home";

const App = () => {
  return (
    <GlobalStateProvider>
      <Home />
    </GlobalStateProvider>
  );
};

// Home.jsx
import { useContext } from "react";
import { GlobalContext } from "./GlobalState";

const Home = () => {
  const { count, setCount } = useContext(GlobalContext);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Intersection Observer hook (useOnScreen)

```jsx
// Hook
function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
```

## Where to find hooks?

You will pretty much find everything googling, most likely someone else has already written a hook that implements the functionality you are thinking about. To find hooks I didn't think I needed I use [useHooks.com](https://usehooks.com/) maintained by ui.dev.

## Thanks for reading, let’s connect

Thanks for reading my blog. Feel free to reach out to me if you have any questions or want to connect. You can also make a pull request if you want to improve the article :)))
