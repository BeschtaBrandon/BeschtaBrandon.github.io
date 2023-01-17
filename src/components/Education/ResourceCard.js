import React from "react";

const ResourceCard = ({ id, title, intro, resourceList }: props) => {
  return (
    <div key={id} className="resource-card">
      <h4 className="mt-3">{title}</h4>
      <div className="resource-content">
        <p>{intro}</p>
        <ul className="pt-1">
          {resourceList.map(resource => (
            <li key={resource.id}>
              <a href={resource.url} rel="noopener noreferrer" target="_blank">
                {resource.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResourceCard;
