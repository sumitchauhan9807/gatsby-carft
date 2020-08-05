const getAssets = require("./get-assets").getAssets;

  // get all assets from craft before the gatsby bootstraps the build process
  exports.onPreBootstrap = (_,{},next) =>{
    getAssets().then((x)=>{
      next();
    })
  }

  

  // Implement the Gatsby API “createPages”. This is called once the
  // data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
  
    // query for all blog entries.
    const result = await graphql(
      `
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
    )
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    // Create single page for each blog-post
    const blogPostTemplate = require("path").resolve(`src/pages/blog-post.js`);
    console.log(result.data.craft.entries,"here comes the result ")
    result.data.craft.entries.forEach(( thisEntry ) => {
      const path = thisEntry.id
      createPage({
        path,
        component: blogPostTemplate,
        context: {
          entryData: thisEntry,
        },
      })
      // context Object can be retrived as a signle-post data source in blog-post.js page.. 
    })
}


  
  //https://docs.google.com/document/d/1hHXwyLb9u99-F2qOPkkM9i7tVQYmd-0fyRCP_G6j3HI/edit