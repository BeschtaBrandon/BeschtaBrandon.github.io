import React from "react";
import ResourceCard from "./ResourceCard";
import { topicList } from "./constants";
import "./Resources.scss";

const Resources = () => {
  return (
    <div className="main mt-4">
      {topicList.map(topic => (
        <ResourceCard
          key={topic.id}
          id={topic.id}
          title={topic.title}
          intro={topic.intro}
          resourceList={topic.resources}
        />
      ))}
    </div>
  );
};

export default Resources;
