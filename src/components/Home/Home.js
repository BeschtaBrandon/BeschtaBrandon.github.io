import React from "react";
import { Col, Container, Image, Row, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./Home.scss";
import { getCurrentTime } from "../../shared/time_utils";
import { programmingLanguageList, techList } from "./constants";

const Home = () => {
  const { t } = useTranslation();

  const renderAboutSection = () => {
    return (
      <Row className="home-content">
        <Col xs={8}>
          <div className="lead">
            <p>
              {t("home.intro-paragraph", {
                time: getCurrentTime("MMMM Do YYYY, h:mm a")
              })}
            </p>
          </div>
        </Col>
        <Col xs={4} className="col-md-push-1">
          <Image
            className="img-fluid self-portrait"
            src="images/portrait.jpg"
            thumbnail
          />
        </Col>
      </Row>
    );
  };

  const renderTechContent = () => {
    return (
      <Row className="tech">
        <Col xs={5} md={4}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              <strong>Tech</strong>
              <i className="fas fa-code-branch" />
            </ListGroup.Item>
            {techList.map(tech => (
              <ListGroup.Item
                key={tech.id}
                action
                href={tech.url}
                target="_blank"
              >
                {tech.title}
                <i className={tech.iconClass} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={7} md={8}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              <strong>Languages</strong>
            </ListGroup.Item>
            {programmingLanguageList.map(language => {
              return (
                <ListGroup.Item key={language.id} as="li">
                  {language.title}
                  <i className={language.iconClass} />
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  };

  const renderHomeHeader = () => {
    return (
      <h3 className="home-header">
        {t("home.header")}
        <i className="fas fa-globe-americas" />
      </h3>
    );
  };

  const renderHomeContent = () => {
    return (
      <Row className="home-content">
        <Col xs={5} md={4}>
          <Image className="img-fluid" src="images/outer_space.jpg" thumbnail />
        </Col>
        <Col xs={7} md={8}>
          {renderHomeHeader()}
          <p className="lead">{t("home.main-paragraph")}</p>
        </Col>
      </Row>
    );
  };

  return (
    <Container className="home-page">
      {renderAboutSection()}
      {renderHomeContent()}
      {renderTechContent()}
    </Container>
  );
};

export default Home;
