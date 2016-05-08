/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import MyApp from './js/MyApp';

class YokohamaPM25React extends Component {
  render() {
    return (
      <MyApp />
    );
  }
}

AppRegistry.registerComponent('YokohamaPM25React', () => YokohamaPM25React);
