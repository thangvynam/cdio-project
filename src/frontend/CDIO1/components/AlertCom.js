import React from "react";
import { Growl } from "primereact/components/growl/Growl";

import "../assets/growl.css";

export default class AlertCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message.message !== prevState.message) {
      return { message: nextProps.message };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.growl.show({
        severity: this.state.message.isRight ? "info" : "warn",
        detail: this.state.message.message
      });
    }
  }

  render() {
    return (
      <Growl
        className="my-growl"
        ref={el => {
          this.growl = el;
        }}
      />
    );
  }
}
