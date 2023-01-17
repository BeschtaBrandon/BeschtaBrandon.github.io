import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';

import './Contact.scss';

class Contact extends Component {
  renderContactHeader = () => {
    return (
      <h1>
        Contact <i className="fas fa-envelope"></i>
      </h1>
    );
  }

  renderContactContent = () => {
    return (
      <div>
        <p className="lead">Plese feel free to reach out!</p>
        <Breadcrumb>
          <Breadcrumb.Item href="mailto:beschtabra2@gmail.com">Email</Breadcrumb.Item>
          <Breadcrumb.Item href="http://facebook.com">
          Facebook
          </Breadcrumb.Item>
          <Breadcrumb.Item href="https://www.linkedin.com/in/brandonbeschta/">LinkedIn</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }

  render () {
    return (
      <div>
        { this.renderContactHeader() }
        { this.renderContactContent() }
      </div>
    );
  }

}

export default Contact;
