import React from "react"
import { render } from "react-dom"


import Todo from "./components/Todo"


 class App1 extends React.Component {






  render() {
    return (

<Todo/>

    )
  }
}

render(<App1/>, document.getElementById('App1'))