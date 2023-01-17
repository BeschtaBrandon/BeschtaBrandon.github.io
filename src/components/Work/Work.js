import React, { Component } from 'react';
import { Image, ListGroup, ListGroupItem, Panel, PageHeader } from 'react-bootstrap';
import moment from 'moment'

import reuters from '../../images/reuters.png';
import uw from '../../images/uw.jpg';
import wts from '../../images/wtsparadigm.png';
import mav from '../../images/mavconsulting.jpg';
import './Work.scss';

class Work extends Component {

  renderWorkHeader = () => {
    return (
      <PageHeader>
        Professional Experiences <i class="fas fa-user-tie"></i>
      </PageHeader>
    );
  }

  renderWorkContent = () => {
    const time = moment().format('MMMM Y');

    return (
      <ListGroup>
        <ListGroupItem className="media" header="Paradigm - Web Developer" bsStyle="success" href="http://myparadigm.com">
          <div className="media-left">
            <Image className="media-object" src={wts} />
          </div>
          <div class="media-body">
            <h5 class="media-heading">Jan 2018 - {time}</h5>
            &nbsp;&nbsp;&nbsp;&nbsp;Responsible for developing web applications written using ReactJs, Laravel, PHP, and C#. Also, assist in deploying these apps to production environments for a manifold of construction
    clients. Our teams uses Docker Swarm and hosts our services on Azure.
          </div>
        </ListGroupItem>
        <ListGroupItem header="University of Wisconsin Madison Mechanical Engineering Department - Software Engineer" href="http://wisc.edu">
          <div className="media-left">
            <Image className="media-object" src={uw} />
          </div>
          <div className="media-body">
            <h5 class="media-heading">Aug 2016 - Jan 2018</h5>
          &nbsp;&nbsp;&nbsp;&nbsp;Implement and design a web application to assist family caregivers of people with dementia or Alzheimer’s disease. This app helps enable informal caregivers, who are often disconnected from each other, to better communicate and document information related to the person with dementia. Additionally, as caregivers document a patient’s dementia-related behaviors over time, the platform will use machine learning to generate caregiver strategies that are tailored for the specific patient.
          </div>
        </ListGroupItem>
        <ListGroupItem header="Thomson Reuters - Software Engineer" href="http://reuters.com">
        <div className="media-left">
          <Image className="media-object" src={reuters} />
        </div>
        <div className="media-body">
          <h5 class="media-heading">Jun 2016 - Sep 2017</h5>
            &nbsp;&nbsp;&nbsp;&nbsp;Built a database migration tool using Java, Spring Boot, and Flyway to keep database schemas up to date. Implemented analytics tools to provide statistics on server usage and cluster management. In addition, wrote automated tests using Selenium framework to improve the quality of our analytics tools.
          </div>
        </ListGroupItem>
        <ListGroupItem header="Maverick Software Consulting - Software Developer Intern" href="http://mavericksoftware.com">
        <div className="media-left">
          <Image className="media-object" src={mav} />
        </div>
        <div className="media-body">
          <h5 class="media-heading">April 2015 - Jun 2016</h5>
            &nbsp;&nbsp;&nbsp;&nbsp;Assisted developers at Thomson Reuters write pages for a web application that help lawyers and legal representatives organize their case information. Some technologies included in this process were Java, Spring Boot and Selenium.
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }

  renderEducation = () => {
    const paragraph = "Prior to starting my professional career, I studied Computer Sciences for four years at the University of Wisconsin - Madison. During that time, I was exposed to a variety of programming languages such as Assembly, C, C++, Java and PHP. Additionally, learned about the importance of data structures, memory mangement, and the basic topics of database mangement systems.";

    return (
      <Panel>
        <Panel.Body>
          { paragraph }
        </Panel.Body>
      </Panel>
    );
  }

  render () {
    return (
      <div>
        { this.renderWorkHeader() }
        { this.renderWorkContent() }
        { this.renderEducation() }
      </div>
    );
  }
}

export default Work;
