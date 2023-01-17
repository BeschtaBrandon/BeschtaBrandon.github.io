import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import "./Weather.scss";

const DATE_FORMAT = "MMMM Do YYYY";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      list: [],
      otherList: [],
      miamiList: [],
      city: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?zip=53715&APPID=29058f38b91822420846508014b42fc0"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            list: result.list,
            city: result.city
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?zip=94112&APPID=29058f38b91822420846508014b42fc0"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            otherList: result.list
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?zip=33101&APPID=29058f38b91822420846508014b42fc0"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            miamiList: result.list
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  renderWeatherHeader = () => {
    return (
      <h2 className="mt-5 mb-4">
        Weather <i className="fas fa-thermometer-half" />
      </h2>
    );
  };

  filterWeatherData = data => {
    let filteredData;
    filteredData = data.filter((item, index) => {
      if (!index) {
        return true;
      }
      let prevDate = moment(data[index - 1].dt_txt).format("YYYY-MM-DD");
      let isSameDate = moment(item.dt_txt).format("YYYY-MM-DD") === prevDate;
      return !isSameDate;
    });
    return filteredData;
  };

  getIcons = data => {
    var icons = [];
    const sun = <i className="text-warning fas fa-sun" />;
    const snow = <i className="text-muted fas fa-snowflake" />;
    const clouds = <i className="text-muted fas fa-cloud-sun" />;
    const rain = <i className="text-muted fas fa-cloud-rain" />;
    for (let i = 0; i < data.length; i++) {
      let mainWeather = data[i].weather[0].main.toLowerCase() || "";
      let weatherDescription =
        data[i].weather[0].description.toLowerCase() || "";
      if (mainWeather.includes("snow")) {
        icons.push(snow);
      } else if (
        mainWeather.includes("cloud") ||
        (weatherDescription.includes("cloud") &&
          (!weatherDescription.includes("clear") ||
            !weatherDescription.includes("sky")))
      ) {
        icons.push(clouds);
      } else if (mainWeather.includes("clear")) {
        icons.push(sun);
      } else if (mainWeather.includes("rain")) {
        icons.push(rain);
      } else {
        icons.push(clouds);
      }
    }
    return icons;
  };

  convertToFahrenheit = degrees => {
    if (degrees === null || degrees === undefined) return;
    return parseInt(((degrees - 273.15) * 9) / 5 + 32);
  };

  renderWIWeatherContent = () => {
    const { error, isLoaded, list, city } = this.state;
    const filteredData = this.filterWeatherData(list).slice(0, 5);
    const weatherIcons = this.getIcons(filteredData);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3>
            <small className="text-danger">
              {city.name ? city.name : "Madison"}, Wisconsin
            </small>
          </h3>
          <Container>
            <Row>
              {filteredData.map((item, i) => (
                <Col key={i} xs={12} md={2}>
                  <div>
                    <p className="lead">
                      {this.convertToFahrenheit(item.main.temp)}
                      &#176;F
                    </p>
                    {weatherIcons[i]} {item.weather[0].main}
                    <p>{moment(item.dt_txt).format(DATE_FORMAT)}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      );
    }
  };

  renderCAWeatherContent = () => {
    const { error, otherList } = this.state;
    const filteredData = this.filterWeatherData(otherList).slice(0, 5);
    const weatherIcons = this.getIcons(filteredData);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="mt-4">
          <h3>
            <small className="text-success">San Francisco, California</small>
          </h3>
          <Container>
            <Row>
              {filteredData.map((item, i) => (
                <Col key={i} xs={12} md={2}>
                  <div>
                    <p className="lead">
                      {this.convertToFahrenheit(item.main.temp)}
                      &#176;F
                    </p>
                    {weatherIcons[i]} {item.weather[0].main}
                    <p>{moment(item.dt_txt).format(DATE_FORMAT)}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      );
    }
  };

  renderFLWeatherContent = () => {
    const { error, miamiList } = this.state;
    const filteredData = this.filterWeatherData(miamiList).slice(0, 5);
    const weatherIcons = this.getIcons(filteredData);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="mt-4">
          <h3>
            <small className="text-warning">Miami, Florida</small>
          </h3>
          <Container>
            <Row>
              {filteredData.map((item, i) => (
                <Col key={i} xs={12} md={2}>
                  <div>
                    <p className="lead">
                      {this.convertToFahrenheit(item.main.temp)}
                      &#176;F
                    </p>
                    {weatherIcons[i]} {item.weather[0].main}
                    <p>{moment(item.dt_txt).format(DATE_FORMAT)}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="bg-light mt-2 pb-3">
        {this.renderWeatherHeader()}
        {this.renderWIWeatherContent()}
        {this.renderCAWeatherContent()}
        {this.renderFLWeatherContent()}
      </div>
    );
  }
}

export default Weather;
