import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Image = function(props){
const data = useStaticQuery(graphql`
    {
        allFile {
          edges {
            node {
              relativePath
              childImageSharp {
                fluid(maxWidth: 2000){
                   ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
  `)

    const image = data.allFile.edges.find(x => {
        return x.node.relativePath.includes(props.filename);
    });
    return <Img alt={props.alt} fluid={image.node.childImageSharp.fluid} />;
}
export default Image;