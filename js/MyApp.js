import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
} from 'react-native';
import DataSource from './DataSource'


export default class MyApp extends Component {
  constructor() {
    super();

    this.dataSources = DataSource.getDataSources();
    this.state =  {
      // TODO save id
      // 鶴見区潮田交流プラザ測定局
      id: '101',
    };

    this._reloadData(this.state.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Picker
          selectedValue={this.state.id}
          onValueChange={(id) => {
            this.setState({id: id});
            this._reloadData(id);
          }}>
          {this.dataSources.map(function(dataSource) {
            return <Picker.Item key={dataSource.id} label={dataSource.name} value={dataSource.id}  />;
          })}
        </Picker>
      </View>
    );
  }

  _reloadData(id) {
    if(!id) { return }

    let dataSourceURL = `http://cgi.city.yokohama.lg.jp/kankyou/saigai/data/pm25_csv_${id}.csv`

    // TODO
    fetch(dataSourceURL)
      .then((csv) => {
        console.log(csv);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});