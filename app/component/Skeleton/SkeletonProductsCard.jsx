import { BlockStack, SkeletonBodyText, Card, Grid, InlineStack, Box, SkeletonTabs ,SkeletonThumbnail  } from "@shopify/polaris";


export const SkeletonProductscard = () =>{
return (
    <BlockStack gap="800">            
          {Array(5).fill(0).map((_, index) => (         
               <Card key={index}>
                <BlockStack gap="500"> 
                <Grid
                  blockAlign="start"
                  columns={{ xs: 1, sm: 5, md: 6, lg: 6, xl: 6 }}
                  areas={{
                    xs: ["product", "button"],
                    sm: ["product product product product button button"],
                    md: ["product product product product button button"],
                    lg: ["product product product product  button button"],
                    xl: ["product product product product button button"],
                  }}
                >
                  <Grid.Cell area="product">
                    <BlockStack>
                      <InlineStack gap="400" wrap={false}>
                        <Box >
                      
                        <SkeletonThumbnail size="large"/>

                        </Box>
                        <BlockStack align="start" gap="200">                        
                              <SkeletonBodyText />                       
                          <InlineStack gap="200">
                            <SkeletonTabs count={2} />
                          </InlineStack>                        
                        </BlockStack>
                      </InlineStack>
                    </BlockStack>
                  </Grid.Cell>                
                </Grid>              
                </BlockStack>
              </Card>  
          )
          )}            
                  
          </BlockStack>   
)
}