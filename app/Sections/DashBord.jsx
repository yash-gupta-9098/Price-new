import { BlockStack, Box, Button, Card, Icon, Text, TextField } from "@shopify/polaris";
import {
    SearchIcon , PlusIcon
  } from '@shopify/polaris-icons';
import { Drop } from "../component/drop";
import { useState } from "react";




export default function DashBoard({handleTextFieldChange , handleBrowseProduct }) {
  const [newProducts , setNewProducts] = useState([])
    const browserButton = (
        <Button icon={PlusIcon} onClick={handleBrowseProduct} >
          Add Product
        </Button>
      );
    return (
      <BlockStack gap="800">

              {/* recource lIst for selected Products*/}
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Add products</Text>  
                  <TextField
                      label=""
                      type="text"
                      value={""}
                      onFocus={handleTextFieldChange}
                      prefix={<Icon source={SearchIcon} tone="base" />}
                      autoComplete="off"      
                      connectedRight={browserButton}
                      placeholder="Search products"
                    />
                  </BlockStack> 
              </Card> 

               {/* List of all selected Products  */}
               <Drop newProducts={newProducts} setNewProducts={setNewProducts} />   

                {/* Only for the  Bottom Space Please don't delete it*/}
               <Box></Box>             
       </BlockStack>
    )

}  