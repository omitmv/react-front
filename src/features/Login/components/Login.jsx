import React from "react";
import { Else, If, Then } from 'react-if';

import { Loading } from "../../../core/Utils";

import './Login.css';

export class Login extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount(){
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({isLoading: false})
    }, "3000")
  }

  render() {
    return (
      <>
        <If condition={this.state.isLoading}>
          <Then>
            <Loading />
          </Then>
        </If>
        <Else>
          <div>Teste</div>
        </Else>
      </>
    )
  }
}
