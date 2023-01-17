import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { myLinks } from "./constants";
import "./footer.scss";

const Footer = () => {
  const current_date = moment().format("MMMM YYYY");
  const { t } = useTranslation();

  const renderMyLinks = () => {
    return (
      <>
        {myLinks.map(link => (
          <li key={link.id} className="list-inline-item">
            <a href={link.linkUrl} aria-label={link.label}>
              <i className={link.icon} aria-hidden="true" />
            </a>
          </li>
        ))}
      </>
    );
  };

  return (
    <footer>
      <ul className="list-inline">
        {renderMyLinks()}
        <li className="list-inline-item">
          <Link to="/contact">{t("contact-me")}</Link>
        </li>
      </ul>
      <span>&copy; {current_date}</span>
    </footer>
  );
};

export default Footer;
