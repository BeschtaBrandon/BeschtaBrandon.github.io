import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { ListGroup, ListGroupItem, Image } from "react-bootstrap";
import { RECENT_NEWS } from "./constants.js";
import moment from "moment";
import { useTranslation } from "react-i18next";

import "./News.scss";
// const SPACE_NEW_API =
//   "https://api.spaceflightnewsapi.net/v3/articles?_limit=10";

const News = () => {
  const { t } = useTranslation();
  const [currentState, setCurrentState] = useState({
    error: null,
    isLoaded: false,
    articles: [],
    apiCode: "e6f7827e0da94e2a8f213be575bbf833"
  });
  //const [spaceArticles, setSpaceArticles] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const viewMoreSpanClassNames = classNames("fas", {
    "fa-chevron-down": !viewMore,
    "fa-chevron-up": viewMore
  });

  useEffect(() => {
    fetch(`http://newsapi.org/v2/top-headlines?country=us`, {
      method: "GET",
      mode: "cors",
      headers: {
        "X-Api-Key": currentState.apiCode
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setCurrentState({
            isLoaded: true,
            articles: result.articles
          });
        },
        error => {
          setCurrentState({
            isLoaded: true,
            error
          });
        }
      );
  }, []);

  //
  // useEffect(() => {
  //   getSpaceNews();
  // }, []);

  // const getSpaceNews = async () => {
  //   fetch(SPACE_NEW_API, {
  //     methood: "GET"
  //   })
  //     .then(response => response.json())
  //     .then(json => setSpaceArticles(json))
  //     .catch(error => console.log("error: ", error));
  // };

  const renderNewsHeader = () => {
    return (
      <h2 className="mt-5 mb-4">
        {t("news.header")}
        <i className="fas fa-newspaper ml-2" />
      </h2>
    );
  };

  // const renderSpaceNews = () => {
  //   if (spaceArticles.length) {
  //     return (
  //       <>
  //         {spaceArticles.map(article => {
  //           return (
  //             <div key={article.id} className="media">
  //               <div className="media-body">
  //                 <h4 className="media-heading">{article.title}</h4>
  //                 <p>{article.summary}</p>
  //               </div>
  //               <div className="media-right">
  //                 <img
  //                   src={article.imageUrl}
  //                   className="media-object img-responsive"
  //                   alt="News article"
  //                 />
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </>
  //     );
  //   }
  // };

  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  const handleClickNewsArticle = url => {
    window.location = url;
  };

  const renderNewsContent = () => {
    // const { error, isLoaded } = currentState;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // }

    return (
      <div className="mb-1">
        <ListGroup>
          {RECENT_NEWS &&
            RECENT_NEWS.slice(0, 8).map(item => (
              <ListGroupItem key={item.url} className="media">
                <div className="media-left">
                  <Image className="media-object mr-3" src={item.urlToImage} />
                </div>
                <div className="media-body">
                  <h4
                    onClick={() => handleClickNewsArticle(item.url)}
                    className="media-heading"
                  >
                    {item.title}
                  </h4>
                  {`${item.description} - ${moment(item.publishedAt).format(
                    "MMMM D YYYY"
                  )}`}
                </div>
              </ListGroupItem>
            ))}

          {RECENT_NEWS &&
            viewMore &&
            RECENT_NEWS.slice(8, RECENT_NEWS.length - 1).map(item => (
              <ListGroupItem key={item.url} className="media">
                <div className="media-left">
                  <Image className="media-object mr-3" src={item.urlToImage} />
                </div>
                <div className="media-body">
                  <h4
                    onClick={() => handleClickNewsArticle(item.url)}
                    className="media-heading"
                  >
                    {item.title}
                  </h4>
                  {`${item.description} - ${moment(item.publishedAt).format(
                    "MMMM D YYYY"
                  )}`}
                </div>
              </ListGroupItem>
            ))}
        </ListGroup>
        <span className="view-more" onClick={() => handleViewMore()}>
          {viewMore ? "" : "View More"} <i className={viewMoreSpanClassNames} />
        </span>
      </div>
    );
  };

  const renderNewsAttribution = () => {
    return <a href="https://newsapi.org">Powered by News API</a>;
  };

  return (
    <div className="news-page">
      {renderNewsHeader()}
      {renderNewsContent()}
      <br />
      {renderNewsAttribution()}
    </div>
  );
};

export default News;
