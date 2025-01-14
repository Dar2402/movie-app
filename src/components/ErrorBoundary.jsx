import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.log("Error caught by Error Boundary:", error);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

/*
catches:
  - Errors thrown during rendering (during mounting).

doesn't catch:
  - Errors in Event Handlers(e.g. onClick, onSubmit)
  use try - catch

  - Error during async operations(e.g. fetch)
  use try - catch
*/

/*

<ErrorBoundary>
  <Child />
  <Child />
  <Child />
  <Child />
</ErrorBoundary>
class A:
  def __init__(self, a, b):
    self.a = a
    self.b = b

  @staticmethod
  def this_is_static_method():
    self.a, self.b
    return (something)

a = A(10, 20)
A.this_is_static_method()

class A{
  constructor(a, b){

  }
}

a = new A(10, 20)

*/
