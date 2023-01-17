import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "react-bootstrap";

import "./Contact.scss";

const Contact = () => {
  const { t } = useTranslation();
  const [catImageInfo, setCatInfo] = useState([]);
  const fetchCatImage = () => {
    return fetch("https://api.thecatapi.com/v1/images/search?size=full", {
      method: "GET",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => setCatInfo(json))
      .catch(error => console.error("error:", error));
  };

  useEffect(() => {
    if (!catImageInfo.length) {
      fetchCatImage();
    }
  }, [catImageInfo]);

  const renderCatImage = () => {
    const firstResult = catImageInfo.length && catImageInfo[0];
    if (firstResult) {
      return (
        <div className="row">
          <img src={firstResult.url} className="img-responsive" alt="Kitty" />
          {/*<button onClick={refreshImage()} className='btn btn-default'>
            <i className='fas fa-redo' />
          </button>*/}
        </div>
      );
    }
  };

  const renderContactHeader = () => {
    return (
      <h2 className="mt-2 mb-2">
        {t("contact")}
        <i className="fas fa-envelope ml-2" />
      </h2>
    );
  };

  const renderContactContent = () => {
    return (
      <>
        <p className="lead">{t("feel-free")}</p>
        <Breadcrumb>
          <Breadcrumb.Item href="mailto:beschtabra2@gmail.com">
            {t("email")}
          </Breadcrumb.Item>
          <Breadcrumb.Item href="https://www.linkedin.com/in/brandonbeschta/">
            {t("linkedIn")}
          </Breadcrumb.Item>
        </Breadcrumb>
      </>
    );
  };

  return (
    <div className="contacts-page">
      {renderCatImage()}
      {renderContactHeader()}
      {renderContactContent()}
    </div>
  );
};

export default Contact;
