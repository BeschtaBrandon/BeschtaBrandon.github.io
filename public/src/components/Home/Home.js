import React, { Component } from 'react';
import { Col, Container, Image, Row, Panel, ListGroup, Carousel} from 'react-bootstrap';
import moment from 'moment';

import './Home.scss';
import nasaPhoto from '../../images/outer_space.jpg';
import portrait from '../../images/portrait.jpg';

class Home extends Component {

  renderAboutSection = () => {

    const curr_time = moment().format("dddd, MMMM Do YYYY, h:mm a");
    const paragraph = "Currently working as web developer as of " + curr_time +
      ". Always eager to learn new web technologies and advance my software skills. Able to communicate well with a team. " +
      "Also, thrive in a company who encourages their employees to collaborate and adapt to this ever-changing world.";

    return (
      <div className="well">
        <Container>
          <Row>
            <Col xs={8} md={9}>
              <div className="paragraph">
                <p>{ paragraph }</p>
              </div>
            </Col>
            <Col xs={4} md={3} className="col-md-push-1">
              <Image src={portrait} responsive />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderTechContent = () => {

    return (
      <div>
        <Container>
          <Row>
            <Col xs={5} md={4}>
              <Image src={nasaPhoto} responsive />
            </Col>
            <Col xs={7} md={8}>
              <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                  Languages
                </ListGroup.Item>
                <ListGroup.Item as="li">HTML5</ListGroup.Item>
                <ListGroup.Item as="li">CSS3</ListGroup.Item>
                  <ListGroup.Item as="li">JavaScript (ES6^)</ListGroup.Item>
                  <ListGroup.Item as="li">
                    PHP
                  </ListGroup.Item>
                  <ListGroup.Item as="li">C#</ListGroup.Item>
                  <ListGroup.Item as="li">Java</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderHomeHeader = () => {
    return (
      <h1>
        <small>Explore the world's boundaries</small>
      </h1>
    );
  }

  renderHomeContent = () => {
      const paragraph = "You have the ability to control your reaction for every event that takes place in your life. That is why life is what you make out of it. Therefore, time on this world is precious, try and dedicate each day into making memories that you and others may cherish forever.";

      return (
        <div>
          <Panel>
             <Panel.Heading>
               <Panel.Title componentClass="h3">Experiences are priceless</Panel.Title>
             </Panel.Heading>
             <Container>
               <Row>
                 <Col xs={5} md={4}>
                  <Image src={nasaPhoto} responsive />
                 </Col>
                 <Col xs={7} md={8}>
                  <Panel.Body>
                    <p>
                      {paragraph}
                    </p>
                  </Panel.Body>
                 </Col>
               </Row>
             </Container>
           </Panel>
         </div>
      );
  }

  renderCarousel = () => {
    return (
      <Carousel>
        <Carousel.Item>
          {this.renderAboutSection()}
          <Carousel.Caption>
            <h3>About me</h3>
            <p>Learn a little more about my day-to-day operations.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  render () {

    return (
      <div>
        { this.renderCarousel() }
        { this.renderTechContent() }
      </div>
    );
  }

}

export default Home;
