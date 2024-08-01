import {
    TextField,
    IndexTable,
    LegacyCard,
    IndexFilters,
    useSetIndexFiltersMode,
    IndexFiltersMode,
    useIndexResourceState,
    Text,
    Tooltip,
    EmptySearchResult,
    Spinner,
    InlineStack,
    Button,
    Navigation,
  } from '@shopify/polaris';
  import {useState, useCallback, useEffect, useMemo} from 'react';
  import {Paginate} from "../component/Paginate";
  import { DeleteIcon, EditIcon, ExportIcon } from '@shopify/polaris-icons';
  import { Link, Navigate, useNavigate } from '@remix-run/react';
  import axios from 'axios';
  import { redirect } from '@remix-run/react';
import { showToastMessage } from './Toast';


  export function GetRules({ruleList , setDataRule}) {  
    const [currentPage, setCurrentPage] = useState(1);  
    const [query, setQuery] = useState('');
    const [filteredSegments, setFilteredSegments] = useState([]);   
    const [itemStrings, setItemStrings] = useState([   
    ]);
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);  
    const [sortBy, setSortBy] = useState('');

    
    useEffect(() => {      
      setFilteredSegments(ruleList); 
     }, [ruleList]);


    //  useEffect(()=>{

    //  }, [])

    // const handleTabChange = useCallback((selectedTabIndex) => {
    //   setSortBy(itemStrings[selectedTabIndex]);
    //   setSelected(selectedTabIndex);
    // }, [itemStrings]);

    // const sortedOrders = useMemo(() => {
    //   if (sortBy === 'All') {        
    //     setFilteredSegments(productList);
    //   }
    //   else if(sortBy === 'UnSelected'){
    //     const notselectedData = productList.filter((product) => {
    //       return (!selctedProducts.includes(product.id))
    //      } );         
    //      setFilteredSegments(notselectedData);
    //   }
    //   else if(sortBy === 'Selected'){
    //     const selectedData = productList.filter((product) => {
    //       return selctedProducts.includes(product.id)
    //      } );
    //      console.log(selectedData);
    //      setFilteredSegments(selectedData);
    //   }
      
    //   else {
    //      const status = productList.filter((product) => {
    //       return product.product_type == "Jewelry"
    //      } );
    //      console.log(status);
    //      setFilteredSegments(status)
    //   }
    // }, [sortBy]);
  
    const tabs= itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 1,
      actions:[],
    }));
    
    function handleFilterProducts(query){
      setFilteredSegments(ruleList);
      console.log(query , "filtered");
      const nextFilteredProducts = filteredSegments.filter((ruleList) => {
        return ruleList.title
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim());
      }); 
     setFilteredSegments(nextFilteredProducts);
    };   

    function handleQueryChange(query){
      console.log(query , "query")
      setQuery(query);  
      if (query.length > 2) {
        handleFilterProducts(query);
      }
      else{
        setSelected(0);
        setFilteredSegments(ruleList)
      }        
    };

    function handleQueryClear(){
      handleQueryChange('');
    };  
    

   async function ruleDeleteHandle(selectedResources){
        // e.preventDefault();
        
      const response  = await axios.post("https://dynamicpricing.expertvillagemedia.com/public/api/deleterule" , 
     { id: selectedResources}
      
      ).then(()=>{       
        
        const remain =  ruleList.filter((item)=>  !selectedResources.includes(item.id))
      setDataRule(remain);
      selectedResources.length = 0; 
      setQuery("");
      // showToastMessage("Rule deleted" , 2000); 
      // console.log(remain , "allremain");
      
      }) 



        
      

    

    }

    


    const editHandle  = (e , id) =>{
      e.stopPropagation()
      console.log(id , "stop propo")
      navigate(`edit/${id}`)
    }


    // function handleSelectionChange(e) {
    //   const productId = e.target.value;
    //   const isChecked = e.target.checked;
    //   if (isChecked) {
    //     dispatch(checkProduct(productId));
    //   } else {
    //     dispatch(uncheckProduct(productId));
    //   }
    // }
      
    const {mode, setMode} = useSetIndexFiltersMode(IndexFiltersMode.Filtering);
    const onHandleCancel = () => {
     

    };
  
    const resourceName = {
      singular: 'Product',
      plural: 'Products',
    }; 

console.log(filteredSegments , "filtered") ;   
  const productsData = Paginate(10, filteredSegments , currentPage);
    const emptyStateMarkup = (    
      
      <EmptySearchResult  
        title={'No Product'}
        description={'Try after some time'}
        withIllustration
      />
    );

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(filteredSegments); 
  

    const promotedBulkActions = [
        {
          destructive: true,
          content: [<Button variant="plain" removeUnderline={true} tone="critical" icon={DeleteIcon} >Delete</Button>],
          onAction: ()=> {ruleDeleteHandle(selectedResources )},
        }    
      ];


    
    // useEffect(()=>{
      
    //   setNewProducts(selectedResources);
    // }, [selectedResources])
    const rowMarkup = productsData.map(
      (
        item,
        index,
      ) => (
        <IndexTable.Row
          id={item.id}
          key={item.id}          
          position={index}
          selected={selectedResources.includes(item.id)}
        >
        
          <IndexTable.Cell>
          <Tooltip content={item.title}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
            {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
            </Text>
            </Tooltip>
          </IndexTable.Cell>        
         
          <IndexTable.Cell>
          <InlineStack wrap={false} gap="200" >
            {/* <Link   to={`edit/${item.id}`}> */}
            <Button data-Arr={item} icon={EditIcon} onClick={(e )=> {editHandle(e  , item.id)} }  ></Button>
            {/* </Link> */}
            {/* <Button icon={DeleteIcon} onClick={} ></Button> */}
        </InlineStack>
        </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
  
    return (
      <LegacyCard>
        <IndexFilters          
          queryValue={query}
          queryPlaceholder="Searching in all"
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          canCreateNewView={false}        
          tabs={tabs}
          selected={selected}        
        //   onSelect={handleTabChange}        
        //   filters={[]}
        //   appliedFilters={[]}
          onClearAll={() => {}}
          mode={mode}
          setMode={setMode}
          hideFilters
          filteringAccessibilityTooltip="Search (F)"
          
          
        />

      
          
          <IndexTable            
            promotedBulkActions={promotedBulkActions}
          emptyState={emptyStateMarkup}
          resourceName={resourceName}
          itemCount={filteredSegments.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
          {title: 'productname'},       
          {title: 'Action'},
          ]}
          pagination={{
            hasNext: filteredSegments.length > (currentPage - 1) * 5 + 5,
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
  
  //   function disambiguateLabel(key: string, value: string | any[]): string {
  //     switch (key) {
  //       case 'moneySpent':
  //         return `Money spent is between $${value[0]} and $${value[1]}`;
  //       case 'taggedWith':
  //         return `Tagged with ${value}`;
  //       case 'accountStatus':
  //         return (value as string[]).map((val) => `Customer ${val}`).join(', ');
  //       default:
  //         return value as string;
  //     }
  //   }
  
  //   function isEmpty(value: string | string[]): boolean {
  //     if (Array.isArray(value)) {
  //       return value.length === 0;
  //     } else {
  //       return value === '' || value == null;
  //     }
  //   }
  }
  