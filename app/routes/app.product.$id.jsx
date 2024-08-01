
import { useDispatch , useSelector  } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Bleed, BlockStack, Box, Button, Card, Collapsible, DatePicker, Divider, Grid, Icon, InlineGrid, InlineStack, LegacyCard, Link, Page, Popover, Text, Thumbnail } from '@shopify/polaris';
import { useParams } from '@remix-run/react';
import { Table } from '../component/Table';
import { CalendarIcon, CaretDownIcon, CaretUpIcon } from '@shopify/polaris-icons';
import {DatePickerWS} from '../component/DatePickerWS';
import { fetchProductsList } from '../features/rules/productsPageSlice';
import {CalendarTimeIcon} from '@shopify/polaris-icons';


export default function(){


    const [tableHeading , setTableHeading] = useState("Today")
    const [dataTableAccor, setDataTableAccor] = useState(true); 
    

    const [popoverActive, setPopoverActive] = useState(false); 
    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
      );
      const activator = (
        <Button onClick={togglePopoverActive} icon={CalendarIcon}>
          
        </Button>
      ); 

      

   
      
    const handleDataTable =(index)=>{    
        setDataTableAccor(prev=>{     
          return !prev
        })  
      }  

    const {id} = useParams();
    const dispatch = useDispatch()   
    const productsData  = useSelector(state=> state.productList.products)
    const status = useSelector(state => state.products.status);
    

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchProductsList());
        }
        
      }, [status, dispatch]);
      
      const product = productsData.find(product => product.product_id === Number(id))   

      if (status == "loading") {
        return <Page> 
        <div>Loading...</div>
        </Page>
    }

    if (!product) {
        return <Page><div>Product not found</div></Page>
    }

    

return(

    <Page title='Product History'>
              <BlockStack gap="500" > 
                           
              <Card>
             
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
                    <Grid.Cell columnSpan={{xs: 11, sm: 11, md: 11, lg: 11, xl: 11}}>
                    <BlockStack>
                        <InlineStack gap="400" wrap={false}>
                        <Box >
                        {
                            <Thumbnail
                            source={
                                product.product_image 
                            }
                            size="large"
                            alt="Black choker necklace"                          
                            
                            />
                        }
                        </Box>
                        <BlockStack align="start" gap="200">
                            <Text alignment="start" variant="headingMd" as="h6" breakWord>
                            {product.product_title}
                            </Text>
                            <InlineStack gap="200" wrap={true}>
                            {product.product_type ? (
                                <Badge tone="info">
                                Type:{product.product_type}
                                </Badge>
                            ) : (
                                ""
                            )}
                            {product.status ? (
                                <Badge tone="success">
                                Status:{product.product_status}
                                </Badge>
                            ) : (
                                ""
                            )}
                            </InlineStack>
                            <InlineStack gap="200">                          
                                <Badge>
                                    Product Code:{product.product_sku}
                                </Badge>
                                <Badge>
                                    BarCode:{product.product_barcode}
                                </Badge>
                                <Badge>Price:{product.product_price}</Badge>
                                
                            </InlineStack>
                        </BlockStack>
                        </InlineStack>
                        {/* BOTTOM */}
                        
                    </BlockStack>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1}}>
                    <BlockStack style={{justifyContent:"end", gap:"5px"}}>  
                    {/* <Link to={`/app/product/${product.product_id}`}>
                    <Button                            
                            icon={CalendarIcon}
                            >                         
                        </Button>  
                        </Link>          */}
                    <Button      
                            disabled= { product.competior_product_url.length <=  0  }                        
                            onClick={()=> handleDataTable(product.id)}
                            icon={dataTableAccor[product.id] ?  CaretUpIcon : CaretDownIcon}
                            ariaExpanded={open}
                            ariaControls="basic-collapsible"
                            >                         
                        </Button>                      
                    </BlockStack>                       

                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 12, lg: 12, xl: 12}}>
                        <Divider borderColor="border" />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 12, lg: 12, xl: 12}}>
                    <InlineStack  gap="400">
                            <Box paddingBlock="400">
                                <Text variant="headingMd" as="h4">Price</Text>                
                                <Text variant="headingXl" as="p">$25.00</Text>
                            </Box>
                            <Box borderColor="border" borderWidth="025"  padding="400" borderRadius="200">  
                                <BlockStack gap="200">
                                    <svg viewBox="0 0 39 16" height="25" width="69" role="img" className="_SVG_186th_144" tabIndex="-1"><title>Decrease of 100%</title><g color="#616161"><g transform="translate(0, 5.25)"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="none" viewBox="0 0 6 6"><path fill="currentColor" fillRule="evenodd" d="M5.75 1a.75.75 0 0 0-1.5 0v2.19L1.655.594a.75.75 0 1 0-1.06 1.06L3.189 4.25H1a.75.75 0 0 0 0 1.5h4a.748.748 0 0 0 .529-.218l.001-.002.002-.001A.748.748 0 0 0 5.75 5V1Z" clipRule="evenodd"></path></svg></g><text x="9.5" y="9.5" fontSize="11" fill="currentColor" fontWeight="650" dominantBaseline="middle" fontFamily="Inter, -apple-system, &quot;system-ui&quot;, &quot;San Francisco&quot;, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, sans-serif" textRendering="geometricPrecision" width="29.27">100%</text></g></svg>
                                    
                                    <svg viewBox="0 0 40 16" height="25" width="70" role="img" className="_SVG_186th_144" tabIndex="-1"><title>Increase of 500%</title><g color="#078D4E"><g transform="translate(0, 5.25)"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="none" viewBox="0 0 6 6"><path fill="currentColor" fillRule="evenodd" d="M1 .25a.75.75 0 1 0 0 1.5h2.19L.594 4.345a.75.75 0 0 0 1.06 1.06L4.25 2.811V5a.75.75 0 0 0 1.5 0V1A.748.748 0 0 0 5 .25H1Z" clipRule="evenodd"></path></svg></g><text x="9.5" y="9.5" fontSize="11" fill="currentColor" fontWeight="650" dominantBaseline="middle" fontFamily="Inter, -apple-system, &quot;system-ui&quot;, &quot;San Francisco&quot;, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, sans-serif" textRendering="geometricPrecision" width="30.96">500%</text></g></svg>
                                </BlockStack>
                            </Box>
                            <Box borderColor="border" borderWidth="025"  padding="400" borderRadius="200"> 
                                <BlockStack gap="200">
                                    <Box >                        
                                        <Text variant="headingMd" as="h4" tone='text-inverse-secondary' fontWeight="regular">Index</Text>                
                                        <Text variant="headingMd" as="p">120.00</Text>
                                    </Box>
                                    <Box>                          
                                        <Text variant="headingMd" as="h4" tone='text-inverse-secondary' fontWeight="regular">Position</Text>                
                                        <Text variant="headingMd" as="p">I’m Cheapest</Text>
                                    </Box>    
                                    </BlockStack>                            
                            </Box>
                            <Box borderColor="border" borderWidth="025"  padding="400" borderRadius="200">  
                                <BlockStack gap="200">
                                    <Box >                          
                                        <Text variant="headingMd" as="h4" tone='text-inverse-secondary' fontWeight="regular">Product Cost</Text>                
                                        <Text variant="headingMd" as="p">10.00</Text>
                                    </Box>
                                    <Box>                          
                                        <Text variant="headingMd" as="h4" tone='text-inverse-secondary' fontWeight="regular">Smart Price</Text>                
                                        <Text variant="headingMd" as="p">Cannot Suggest Smart Price</Text>
                                    </Box>  
                                    </BlockStack>                             
                            </Box>  
                            <Card background="bg-surface-secondary" roundedAbove="xs">
                                <InlineGrid gap="200" alignItems="center">                                            
                                    <Box background="bg-surface-secondary" padding="400" borderRadius="200">  
                                        <InlineGrid gap="200" alignItems="center">                                                             
                                                <Text variant="headingMd" as="h4" tone='text-inverse-secondary' fontWeight="regular">Last Update</Text>
                                                <InlineStack >     
                                                    <Icon source={CalendarTimeIcon} tone="base"/>
                                                    <Text variant="headingMd" as="p">20 May 2024 00.20</Text>     
                                                </InlineStack>                                
                                            </InlineGrid>                             
                                    </Box> 
                                </InlineGrid>   
                            </Card>                                        
                        </InlineStack>
                    </Grid.Cell>
                </Grid>
                              
               
              </Card>
              {/* <Card>
                <InlineStack wrap={false} gap="400">
                    <Box paddingBlock="400">
                        <Text variant="headingMd" as="h4">Price</Text>                
                        <Text variant="headingXl" as="p">$25.00</Text>
                    </Box>
                    <Box borderColor="border" borderWidth="025"  padding="400" borderRadius="200">  
                        <InlineStack wrap={false} gap="400">
                            <Box >                          
                                <Text variant="headingMd" as="p" tone='text-inverse-secondary'>Index</Text>                
                                <Text variant="headingLg" as="p">120.00</Text>
                            </Box>
                            <Box>                          
                                <Text variant="headingMd" as="p">Position</Text>                
                                <Text variant="headingLg" as="p">I’m Cheapest</Text>
                            </Box>
                        </InlineStack>
                    </Box>
                    <Box borderColor="border" borderWidth="025"  padding="400" borderRadius="200">  
                        <InlineStack wrap={false} gap="400">
                            <Box >                          
                                <Text variant="headingMd" as="p" tone='text-inverse-secondary'>Product Cost</Text>                
                                <Text variant="headingLg" as="p">10.00</Text>
                            </Box>
                            <Box>                          
                                <Text variant="headingMd" as="p">Smart Price</Text>                
                                <Text variant="headingLg" as="p">Cannot Suggest Smart Price</Text>
                            </Box>
                        </InlineStack>
                    </Box>
                    <Box borderColor="border" borderWidth="025"  padding="400" borderRadius="200">  
                        <InlineStack wrap={false} gap="400">
                            <svg viewBox="0 0 39 16" height="16" width="39" role="img" className="_SVG_186th_144" tabIndex="-1"><title>Decrease of 100%</title><g color="#616161"><g transform="translate(0, 5.25)"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="none" viewBox="0 0 6 6"><path fill="currentColor" fillRule="evenodd" d="M5.75 1a.75.75 0 0 0-1.5 0v2.19L1.655.594a.75.75 0 1 0-1.06 1.06L3.189 4.25H1a.75.75 0 0 0 0 1.5h4a.748.748 0 0 0 .529-.218l.001-.002.002-.001A.748.748 0 0 0 5.75 5V1Z" clipRule="evenodd"></path></svg></g><text x="9.5" y="9.5" fontSize="11" fill="currentColor" fontWeight="650" dominantBaseline="middle" fontFamily="Inter, -apple-system, &quot;system-ui&quot;, &quot;San Francisco&quot;, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, sans-serif" textRendering="geometricPrecision" width="29.27">100%</text></g></svg>
                        </InlineStack>
                    </Box>                    
                </InlineStack>
              </Card> */}

              
             
              <Grid  blockAlign="start"
                columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>                  
                  <Grid.Cell>                                  
                    <Collapsible
                    open={dataTableAccor}
                    id="basic-collapsible"
                    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}                  
                    >                  
                    {
                      product.competior_product_url && product.competior_product_url.length > 0 && 
                                      <Card > 
                                        <Box paddingBlockEnd={600}>
                                            <InlineGrid gap="400" columns={2} alignItems={"end"}>
                                                <Text variant="headingMd" as="h5" >{`${tableHeading} Price`}</Text>
                                                <Box align={"end"}>                                                  
                                                    < DatePickerWS setTableHeading={setTableHeading} />
                                                </Box>
                                            </InlineGrid>
                                        </Box>
                                          <LegacyCard>
                                          <Table dataRow={product.competior_product_url}  resourceName={"product"}/>
                                          </LegacyCard>
                                          </Card>
                    }
                      
                      
                    </Collapsible>
                  </Grid.Cell> 
              </Grid>
              </BlockStack>          
        
    </Page>
)




}


// async function getProductById(id) {
//     // Replace with your actual data fetching logic
//     const products = [
//       { id: "1", name: "Product 1", description: "Description 1", price: 100 },
//       { id: "2", name: "Product 2", description: "Description 2", price: 200 },
//     ];
  
//     return products.find(product => product.id === id);
//   } 