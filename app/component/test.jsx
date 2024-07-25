import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Icon,
    Text,
    Badge,
    Box,
    BlockStack, 
    Tooltip,
    TextField
  } from '@shopify/polaris';
  import React, { useEffect, useState } from 'react';
  import {SearchIcon} from '@shopify/polaris-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Slice/dashborad/productSlice';

  
  export function Test() {
    const dispatch = useDispatch()    
    const [currentPage, setCurrentPage] = useState(1);
    const product = useSelector(state=> state.productSlice)
    const productList = useSelector(state=> state.productSlice.productList)
    const loading = useSelector(state => state.productSlice.loading);
    const newProducts = useSelector(state=> state.productSlice.newselectedProducts)   
// search
    const [query, setQuery] = useState('');
    const [filteredSegments, setFilteredSegments] = useState(productList);
    useEffect(()=>{
      dispatch(fetchProducts())
    }, [])

    useEffect(() => {
      setFilteredSegments(productList); // Initialize filteredSegments with productList
    }, [productList]);




    function handleFilterProducts(query){
        console.log(query , "filtered");
        const nextFilteredProducts = filteredSegments.filter((productList) => {
          return productList.title
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim());
        }); 
       setFilteredSegments(nextFilteredProducts);
      };

      function handleQueryChange(query){
        console.log(query);
        setQuery(query);
    
        if (query.length >= 2){
          handleFilterProducts(query);
        } else {
          setFilteredSegments(productList); // Reset filteredSegments to original productList when query is cleared
        }
      };

      function handleQueryClear(){
        handleQueryChange('');
      };  


    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };
  
    function handleSelectionChange(e) {
        const productId = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
          dispatch(checkProduct(productId));
        } else {
          dispatch(uncheckProduct(productId));
        }
      }

      
    //   const {selectedResources, allResourcesSelected , } =
    //   useIndexResourceState(productList);
    
      const itemsPerPage = 10; // Number of items per page      
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedList = filteredSegments.slice(start, end);

      const productsData = paginatedList;

    const rowMarkup = productsData.map(
      (
        item,
        index,
      ) => (
        <IndexTable.Row
          id={item.id}
          key={item.id}
          selected={product.products.includes(item.id) || newProducts.includes(item.id)}
          position={index}
          disabled={product.products.includes(item.id)}
        >
        
          <IndexTable.Cell>
          <Tooltip content={item.title}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
            {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
            </Text>
            </Tooltip>
          </IndexTable.Cell>
          
          <IndexTable.Cell>{item.variants[0].sku}</IndexTable.Cell>
          <IndexTable.Cell>{item.variants[0].barcode}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {item.variants[0].price}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{item.status}</IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
  
    return (
        
        
      <LegacyCard style={{overflowY: 'auto' }}>
        <div style={{padding: "12px"}}>
        <TextField 
          clearButton
          labelHidden
          placeholder="Search segments"
          autoComplete="off"
          value={query}
          prefix={<Icon source={SearchIcon} />}
          onChange={handleQueryChange}
          onClearButtonClick={handleQueryClear}     
        
        />
        
        </div>
        
        <IndexTable
          resourceName={resourceName}
          itemCount={filteredSegments.length}
        //   selectedItemsCount={
        //     productList.length ? 'All' : product.products.length
        //   }
          onSelectionChange={handleSelectionChange}
          headings={[
          {title: 'productname'},
          {title: 'Product Code'},
          {title: 'Barcode'},
          {title: 'Product Cost'},
          {title: 'Status'},
          ]}
          pagination={{
            hasNext: filteredSegments.length > end,
            hasPrevious: currentPage !== 1 ,
            onNext: () => {
                setCurrentPage(prev=> prev + 1)
            },
            onPrevious: () =>{
                setCurrentPage(prev=> prev - 1)
            }
          }}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      
    );
  }