import React, { Component } from 'react';
import './Commands.css';
import ReactGA from 'react-ga';
import CmdTable from '../../CmdTable/CmdTable'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Commands extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    ReactGA.pageview('/commands');
  }

  componentWillMount() {
    fetch('api/cmds')
      .then(results => {
        return results.json();
      }).then(data => {
        let info = []
        Object.keys(data).forEach((key, index) => {
          data[key].key = key
          data[key].pos = index
          info.push(data[key]);
        })
        this.setState({categories: info});
      })
  }

  render() {
    let titles = this.state.categories.map(data => <Tab>{data.key}</Tab>)
    let cats = []
    this.state.categories.map(data => {
      // let cmds = data.map(d => (
      //   <h2>{d.triggers[0]}</h2>
      // ));
      console.log(data)
      cats.push(<TabPanel><CmdTable data={data}/></TabPanel>)
    })
    //console.log(cats)
    return(
      <Tabs forceRenderTabPanel defaultIndex={1} selectedTabClassName='active-tab' className='overide commands-page'>
        <TabList>
          {titles}
        </TabList>
        {cats}
      </Tabs>
    )
  }
}

export default Commands;