
import { useDispatch , useSelector  } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Bleed, BlockStack, Box, Button, Card, Collapsible, DatePicker, Grid, InlineGrid, InlineStack, LegacyCard, Link, Page, Popover, Text, Thumbnail } from '@shopify/polaris';
import { useParams } from '@remix-run/react';
import { Table } from '../component/Table';
import { CalendarIcon, CaretDownIcon, CaretUpIcon } from '@shopify/polaris-icons';
import {DatePickerWS} from '../component/DatePickerWS';
import { fetchProductsList } from '../features/rules/productsPageSlice';



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
              <InlineGrid gap="400" columns={2}>              
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
                    <Grid.Cell area="product">
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
                            <InlineStack gap="200">
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
                    </BlockStack>
                    </Grid.Cell>
                    <Grid.Cell area="button">
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
                </Grid>
                              
               
              </Card>
              <Card>
                <InlineStack wrap={false} gap="400">
                    <Box padding="400">
                        <Text variant="headingMd" as="h4">
                            Price
                        </Text>                
                        <Text variant="headingXl" as="p">$25.00</Text>
                    </Box>
                    <Box borderColor="border" borderWidth="025"  padding="400">                          
                                    <Text variant="headingMd" as="h4">
                                        Price
                                    </Text>                
                                    <Text variant="headingXl" as="p">$25.00</Text>
                    </Box>
                    <Box borderColor="border" borderWidth="025"  padding="400">                          
                                    <Text variant="headingMd" as="h4">
                                        Price
                                    </Text>                
                                    <Text variant="headingXl" as="p">$25.00</Text>
                    </Box>
                </InlineStack>
              </Card>

              
              </InlineGrid>
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