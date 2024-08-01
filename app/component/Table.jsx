import {IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  useBreakpoints,
  Link,
  Button,
  InlineStack,
  Icon,
  EmptySearchResult,} from '@shopify/polaris';
  import {DeleteIcon, EditIcon, ExportIcon, ImportIcon} from '@shopify/polaris-icons';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { showToastMessage } from './Toast';

export function Table({dataRow , dataName , appendTableData , loading}) {

  const [tableRoWData, setTableRoWData] = useState([]);
  const [deletedValue , setDeletedValue] = useState([]) 

  useEffect(()=>{  
    setTableRoWData(dataRow)
  },[dataRow])



  const resourceName = {
    singular: {dataName},
    plural: `${dataName}s`,
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
  useIndexResourceState(tableRoWData); 



  // id:2
  // dynamic_price_product_id:1
  // shop_address:"princess-demo-store.myshopify.com"
  // url:"https://www.ebay.com/p/17048682879"
  // domain_name:"ebay.com"
  // product_price:34
  // usd_price:34
  // currency:"USD"
  // currency_symbol:"$"
  // stock:"Yes"
  // product_price_old:34
  // created_at:"2023-12-27T10:44:48.000000Z"
  // updated_at:"2024-02-15T12:30:02.000000Z" 




  const rowMarkup = tableRoWData.map(
    (
      {id , dynamic_price_product_id , url , domain_name , product_price ,  usd_price , currency_symbol , stock , product_price_old  },
      index,
    ) => (
      
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Link dataPrimaryLink  url={url} onClick={() => console.log(`Clicked ${name}`)}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {domain_name}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
              <Text numeric>
                  {product_price}
              </Text>
          </IndexTable.Cell>
        <IndexTable.Cell><Text numeric> {usd_price}</Text></IndexTable.Cell>
        <IndexTable.Cell> {currency_symbol == "?" ? "₹" : currency_symbol}</IndexTable.Cell>
        <IndexTable.Cell>{stock}</IndexTable.Cell>
       
      </IndexTable.Row>
    ),
  ); 


  // const emptyStateMarkup = (
  //   <EmptySearchResult
  //     title={'No Product Found'}
  //     description={'Please add Url do you want to add at here '}
  //     withIllustration
  //   />
  // );


  const promotedBulkActions = [
    {
      destructive: true,
      content: [<Button variant="plain" removeUnderline={true} tone="critical" icon={DeleteIcon} >Delete</Button>],
      onAction: () => {
        setDeletedValue(selectedResources)
        axios.post("https://dynamicpricing.expertvillagemedia.com/public/api/getwebsitelinkdelete" , {
          id: selectedResources
        }).then((res)=>{

      if (res.data.status == "success"){
        // const newValue = tableRoWData.filter((item) => !selectedResources.includes(item.id))
        // setTableRoWData(newValue);
        if(dataRow.length > 0){
          for (let i = dataRow.length - 1; i >= 0; i--) {
            if (selectedResources.includes(dataRow[i].id)) {
              dataRow.splice(i, 1);
            }
          }
        } 
      
        console.log(dataRow , "dataRow")
        setDeletedValue([])
        selectedResources.length = 0
      }
          
          showToastMessage(res.data.data , 2000)         
          console.log("test")
        })         
      },
    }    
  ];
  // const bulkActions = [
  //   {
  //     title: 'Export & Import',
  //     items: [
  //       {
  //         content: 'Export With PDF',
  //         onAction: () => console.log('Todo: implement PDF importing'),
  //         icon: ExportIcon,
      
  //       },
  //       {
  //         icon: ImportIcon,
  //         content: 'Import from CSV',
  //         onAction: () => console.log('Todo: implement CSV importing'),
  //       },
  //     ],
  //   },
  // ]; 

  const emptyStateMarkup = (
    <EmptySearchResult
      title={'No product yet'}
      description={'Try changing the filters or search term'}
      
    />
  );
 

  return (
   
      <>
   




    <div
    className='table-wrapper'
    style={{      
      maxHeight:"500PX",
    }}
  >

    <IndexTable
      
      emptyState={emptyStateMarkup}
      condensed={useBreakpoints().smDown}
      resourceName={resourceName}
      itemCount={dataRow.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      
      // bulkActions={bulkActions}
      promotedBulkActions={promotedBulkActions}
      headings={[
        {title: 'Company'},
        {title: 'Product Price'},
        {title: 'Price(USD)'},
        {title: 'Change'},
        {title: 'Stock'},
      ]}
    >
      {rowMarkup}
    </IndexTable>
 </div>

     

 </>
  );
}