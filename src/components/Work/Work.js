import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { employerList } from "./constants";
import "./Work.scss";

const Work = () => {
  const { t } = useTranslation();

  const renderWorkHeader = () => {
    return (
      <h2 className="mt-5 mb-4">
        {t("professional.experiences")}
        <i className="fas fa-user-tie ml-2" />
      </h2>
    );
  };

  const renderWorkContent = () => {
    return (
      <ListGroup>
        {employerList.length &&
          employerList.map((employer, index) => {
            return (
              <ListGroup.Item
                key={employer.id}
                action
                active={index === 0}
                className="media"
                header={employer.header}
                href={employer.link}
              >
                <Image className="mr-3" src={employer.imgSrc} />
                <div className="media-body">
                  <h5 className="media-heading">
                    {employer.title} <small>{employer.time}</small>
                  </h5>
                  {employer.description}
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    );
  };

  const renderEducation = () => {
    return (
      <ul className="list-group education-section">
        <li className="list-group-item">{t("professional.education")}</li>
      </ul>
    );
  };

  return (
    <div className="experience-page">
      {renderWorkHeader()}
      {renderWorkContent()}
      {renderEducation()}
    </div>
  );
};

export default Work;
