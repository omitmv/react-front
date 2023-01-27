import React, { createContext } from "react";

import { globalInitializer } from "../../../features/App/components/globalInitializer";

import { ReducersController } from './reducersController';

import { Loading } from '../../Utils';

export const AppContext = createContext();

export class GlobalContext extends React.Component{
  constructor(props){
    super(props);
    this.reducer = new ReducersController();

    const state = props.initialState || {};
    const action = {};
    this.state = {
      ...this.reducer.callReducer(state, action),
      isLoading: true,
      isCallToast: false,
    }
  }

  componentDidMount() {
    const value = this.getContextValue();
    globalInitializer(value);

    this.setState({isLoading: false})
  }

  dispatch = action => this.setState(prevState => this.reducer.callReducer(prevState, action));

  getContextValue() {
    return { ...this.state, dispatch: this.dispatch};
  }

  setCallToast = () => {
    const OPEN_DURATION = 3000;
    this.setState({isCallToast: true});
    const timer = setTimeout(() => {
      this.setState({isCallToast: false});
    }, OPEN_DURATION);

    return () => {
      clearTimeout(timer);
    }
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    const value = this.getContextValue();
    const { isLoading } = this.state;

    return (
      <AppContext.Provider value={value}>
        {isLoading && this.renderLoading()}
        {!isLoading && this.props.children}
      </AppContext.Provider>
    )
  }
}