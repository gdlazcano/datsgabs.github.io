---
title: "Combining useState and useContext gives you superpowers in React"
date: 2021-06-30T13:06:09-05:00
draft: false
description: ""
tags: ["react"]
---

Since the implementation of React Hooks almost everyone uses them and most libraries have some sort of implementation of hooks.

Today I was working on making on a tierlist maker for another project and I noticed I was passing an object by props a lot and on multiple levels. So I decided to use context.

After thiking it I noticed I could pass the value and the setter in an object using context in order to be able to mutate the data structure in every part of my project. I would just have to use destructuring to get the `state` and the `setState` as well as importing the context from the application, for obvious reasons.

{{< highlight react >}}

// App.jsx

import React, {createContext, useState} from 'react'
import AnotherComponent from './AntoherComponent'

export const ApplicationContext = createContext()

export default function App () {

    const [state, setState] = useState("test")

    return (
        <ApplicationContext.Provider value={{state, setState}}>
            <AnotherComponent />
        </ApplicationContext.Provider>
    )

}

// AnotherComponent.jsx

import React, {useContext} from 'react'
import { ApplicationContext } from './App'

export default function AnotherComponent () {

    const {state, setState} = useContext(ApplicationContext)

    return (
        <input value={state} onChange={e => setState(e.target.value)} type="text" />
    )

}
{{< /highlight >}}

In this way I achieved being able to access and mutate my state from every part of the application. Thanks for reading, if you've got any suggestions or question let me know :)
