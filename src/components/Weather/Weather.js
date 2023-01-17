import React, { Component } from 'react';
import { Container, Row, Col, PageHeader } from 'react-bootstrap';
import moment from 'moment';

import './Weather.scss';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      list: [],
      otherList: [],
      city: ""
    };
  }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?zip=53715&APPID=29058f38b91822420846508014b42fc0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            list: result.list,
            city: result.city,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      fetch("https://api.openweathermap.org/data/2.5/forecast?zip=94112&APPID=29058f38b91822420846508014b42fc0")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              otherList: result.list,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
  }

  renderWeatherHeader = () => {
    return (
      <PageHeader>
        Weather <i class="fas fa-thermometer-half"></i>
      </PageHeader>
    );
  }

  filterWeatherData = (data) => {
    let filteredData;
    filteredData = data.filter((item, index) => {
      if (!index) {
        return true;
      }
      let prevDate = moment(data[index - 1].dt_txt).format("YYYY-MM-DD");
      let isSameDate = moment(item.dt_txt).format("YYYY-MM-DD") === prevDate;
      return !isSameDate;
    })
    return filteredData;
  }

  getIcons = (data) => {
    var icons = [];
    const sun = <i className="text-warning fas fa-sun"> </i>;
    const snow = <i className="text-muted fas fa-snowflake"> </i>;
    const clouds = <i class="text-muted fas fa-cloud-sun"> </i>;
    const rain = <i className="text-muted fas fa-cloud-rain"> </i>;
    for (let i = 0; i < data.length; i++) {
      if (data[i].weather[0].main === "Snow") {
        icons.push(snow);
      } else if (data[i].weather[0].main === "Clouds") {
        icons.push(clouds);
      } else if (data[i].weather[0].main === "Clear") {
        icons.push(sun);
      } else if (data[i].weather[0].main === "Rain") {
        icons.push(rain);
      }
       else {
        icons.push(clouds);
      }
    }
    return icons;
  }

  renderWIWeatherContent = () => {
    const { error, isLoaded, list, city } = this.state;
    const filteredData = this.filterWeatherData(list).slice(0,5);
    const weatherIcons = this.getIcons(filteredData);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <PageHeader>
          <small>{city.name ? city.name : "Madison"}, Wisconsin</small>
        </PageHeader>
        <Container>
          <Row>
            <ul>
              {filteredData.map((item, i) => (
                <Col className="col-md-push-1" xs={12} md={2}>
                  <li key={item.toString()}>
                    <div>
                      <p className="lead">
                      {
                        parseInt((item.main.temp - 273.15) * 9/5 + 32)
                      }
                        &#176;F
                      </p>
                      { weatherIcons[i] } {item.weather[0].main}
                      <p>{ moment(item.dt_txt).format("MMMM Do YYYY") }</p>
                    </div>
                  </li>
                </Col>
              ))}
            </ul>
          </Row>
        </Container>
        </div>
      );
    }
  }

  renderCAWeatherContent = () => {
    const { error, isLoaded, otherList } = this.state;
    const filteredData = this.filterWeatherData(otherList).slice(0,5);
    const weatherIcons = this.getIcons(filteredData);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <PageHeader>
          <small>San Francisco, California</small>
        </PageHeader>
        <Container>
          <Row>
            <ul>
              {filteredData.map((item, i) => (
                <Col className="col-md-push-1" xs={12} md={2}>
                  <li key={item.toString()}>
                    <div>
                      <p className="lead">
                      {
                        parseInt((item.main.temp - 273.15) * 9/5 + 32)
                      }
                      &#176;F
                      </p>
                      { weatherIcons[i] } {item.weather[0].main}
                      <p>{ moment(item.dt_txt).format("MMMM Do YYYY") }</p>
                    </div>
                  </li>
                </Col>
              ))}
            </ul>
          </Row>
        </Container>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        { this.renderWeatherHeader() }
        { this.renderWIWeatherContent() }
        { this.renderCAWeatherContent() }
      </div>
    );
  }
}

export default Weather;
