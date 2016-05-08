import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  ScrollView,
  ListView,
} from 'react-native';
import DataSource from './DataSource'
import PM25Data from  './PM25Data'
import RNChart from 'react-native-chart';


export default class MyApp extends Component {
  constructor() {
    super();

    this.dataSources = DataSource.getDataSources();
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state =  {
      // TODO save id
      // 鶴見区潮田交流プラザ測定局
      id: '101',
      chartSource: ds.cloneWithRows([]),
    };

    this._reloadData(this.state.id);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
        <ListView
          dataSource={this.state.chartSource}
          renderRow={(rowData) =>
            <View>
              <Text>{rowData.date}</Text>
              <View style={styles.chartContainer}>
                <RNChart style={styles.chart}
                 chartData={[{
                      name: 'LineChart',
                      type: 'line',
                      color:'purple',
                      widthPercent: 0.6,
                      data: rowData.values,
                    },
                  ]}
                 verticalGridStep={5}
                 xLabels={xLabels}/>
              </View>
            </View>
          }
        />
      </ScrollView>
    );
  }

  _reloadData(id) {
    if(!id) { return }

    let dataSourceURL = `http://cgi.city.yokohama.lg.jp/kankyou/saigai/data/pm25_csv_${id}.csv`

    // TODO
    fetch(dataSourceURL)
      .then((response) => response.text()
        .then((src) => {
          let pm25Data = new PM25Data(src);

          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({chartSource: ds.cloneWithRows(pm25Data.data)})
        }))
      .catch((err) => {
        console.log(err);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
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
  chartContainer: {
    height: 250,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    position: 'absolute',
    top: 16,
    left: 4,
    bottom: 4,
    right: 16,
  },
});


// FIXME
const xLabels = ['1','3','5','7','9','11','13','15','17','19','21','23'];
