import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import FluidImg from "../images-com";
function BlogPost(postData) {
    const  data  = postData.pageContext
    //console.log(data,"pageContextpageContextpageContext")
    return (
      <div>
         <br/><br/>
        <div className="container">
        <h2>{data.entryData.title}</h2>
        <div className="card img-fluid" style={{color:'black'}}>
        <FluidImg filename={data.entryData.fieldgroup[1].blogImage[0].title}></FluidImg>
            <div className="card-img-overlay">
            <h4 className="card-title">{data.entryData.title}</h4>
            <p className="card-text">{data.entryData.fieldgroup[0].blogName}</p>
            <Link to="/" className="btn btn-primary">See all posts</Link>
            </div>
        </div>
        </div>
      </div>
    )
  }
export default BlogPost