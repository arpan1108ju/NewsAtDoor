import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=>{

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  
  
  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


const updateNews = async(pageNo)=>{
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${pageNo}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  console.log(data);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  setArticles(parsedData.articles);
  setPage(pageNo);
  setTotalArticles(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
}

  useEffect(() => {
    document.title = capitalizeFirstLetter(props.category) + " NewsMonkey";
    updateNews(1);
  }, [])

  const handlePreviousClick = async()=>{
    updateNews(page - 1)
  }

  const handleNextClick= async()=>{
    updateNews(page + 1)
  }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    console.log("data",data);
    let parsedData = await data.json();
    setPage(page + 1);
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
  };
    return (
      <>
        <h1 className='my-5 text-center headline'>NewsAtDoor - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner/>}
        >
        <div className='container my-3'>
        <div className="row my-4">
          
          {articles.map((element)=>{
              // console.log(element); 
              return <div className="col md-4 mx-1" key={element.url}>
              <NewsItem 
                title={element.title?element.title:""}
                description={element.description?element.description.slice(0,100):""} 
                imageUrl={element.urlToImage}
                newsUrl = {element.url}
                author = {element.author}
                date = {element.publishedAt}
                source = {element.source.name}
              />
            </div>
          })}
         </div>
            
        </div>
      </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-success" onClick={handlePreviousClick}>&larr; Previous</button>
        <button disabled={ page + 1 > Math.ceil(totalArticles/props.pageSize)} type="button" className="btn btn-success" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = {
  country : 'in',
  pageSize : '5',
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News
