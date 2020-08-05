import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import FluidImage from "../images-com"
 const blogPosts = function({data}){
  return (
  <div className="container">
    <br />
    <center><h3>All Craft Blog Posts</h3></center>
    <div className="row">
        {data.craft.entries.map((blogEntry)=>{
            return <div className="card col-md-6" key={blogEntry.title}>
            <FluidImage className="card-img-top" filename={blogEntry.fieldgroup[1].blogImage[0].title} alt="Card image cap" ></FluidImage>
            <div className="card-body">
            <h5 className="card-title">{blogEntry.title}</h5>
              <p className="card-text">{blogEntry.fieldgroup[0].blogName}</p>
              <Link to={"/"+blogEntry.id} className="btn btn-primary">Go somewhere</Link>
            </div>
          </div>
        })}
        </div>
    </div>
  )
} 


export const query = graphql`
  {
    craft {
      entries(section: "blogs") {
        ... on CRAFT_blogs_blogs_Entry {
          id
          title
          fieldgroup {
            ... on CRAFT_fieldgroup_blogName_BlockType {
              blogName
            }
            ... on CRAFT_fieldgroup_image_BlockType {
              blogImage {
                url filename title
              }
            }
          }
        }
      }
    }
  }
`

export default blogPosts