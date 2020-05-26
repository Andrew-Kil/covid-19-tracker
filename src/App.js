import React from "react";
import { Typography } from "@material-ui/core";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

import styles from "./App.module.css";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Typography variant="p" color="textPrimary">
          Last updated:
        </Typography>
        <Typography variant="h6" color="textPrimary">
          {new Date(data.lastUpdate).toDateString()}
        </Typography>
        <Cards data={data}></Cards>
        <CountryPicker
          handleCountryChange={this.handleCountryChange}></CountryPicker>
        <Chart data={data} country={country}></Chart>
      </div>
    );
  }
}

export default App;
