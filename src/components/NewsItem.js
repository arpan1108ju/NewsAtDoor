import React from 'react'

const NewsItem =(props)=>{

        let { title, description, imageUrl, newsUrl,author,date,source} = props;
        return (
            <div className='my-3 mx-1'>
                <div className="card" style={{ width: "18rem" }}>
                    <div style = {{
                        display : 'flex',
                        justifyContent : 'flex-end',
                        position : 'absolute',
                        right : '0',
                        color : 'white',
                    }}>
                       <span className="rounded-pill bg-warning"> {source} </span>
                    </div>
                    <img src={!imageUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXUbiUyNX8hFGfXIyndbUfq0Y88AB4pqsQQ&usqp=CAU" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                        <h5 className="card-title">{title}</h5>
                        
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        <div className="my-2 card-footer text-body-secondary">
                            By {author?author:"Unknown"} on {(new Date(date)).toGMTString()}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
