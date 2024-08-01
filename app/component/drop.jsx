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
    SkeletonTabs,
    ButtonGroup,
  } from '@shopify/polaris';
  // import {IndexFiltersProps, TabProps} from '@shopify/polaris';
  import {useState, useCallback, useEffect, useMemo} from 'react';
  import {Paginate} from "../component/Paginate";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';
import { fetchRules , deleteRule } from '../features/rules/rulesSlice';
import { fetchProducts } from '../features/rules/productSlice';
  export function Drop({ newProducts, setNewProducts}) {  
    const dispatch = useDispatch()   
    // const selctedProducts = useSelector((state) => state.rules.rules); 
   
    
    
  const products = useSelector((state) => state.products.products);
  console.log(products , "next_page_url");
    const status = useSelector((state) => state.rules.status);
    const error = useSelector((state) => state.rules.error);
    const productsList = products?.getproducts?.data || [];
    const [sortSelected, setSortSelected] = useState(['title asc']);
  const current_page = products?.getproducts?.current_page || 1;
  const next_page_url = products?.getproducts?.next_page_url || null;
  const prev_page_url = products?.getproducts?.prev_page_url || null;
  const last_page = products?.getproducts?.last_page || 1;
 console.log(products , "aLL DATA");
 
//  const [paginationUrl , setPaginationUrl]  = useState("")



//  console.log(nextPageValue  , prevPageValue );
 const sortOptions= [
        {label: 'Product', value: 'title asc', directionLabel: 'Ascending'},
        {label: 'Product', value: 'title desc', directionLabel: 'Descending'},  
        {label: 'Price', value: 'price asc', directionLabel: 'Ascending'},
        {label: 'Price', value: 'price desc', directionLabel: 'Descending'},      
      ];

    useEffect(() => {
      if (status === 'idle') {
        // dispatch(fetchRules());
        dispatch(fetchProducts());
      }
      
    }, [status , dispatch ]);

 
    // const [currentPage, setCurrentPage] = useState(1); 
    const [query, setQuery] = useState('');
    const [filteredSegments, setFilteredSegments] = useState([]);   
    
    

    useEffect(()=>{
      const sortedOrders = sortOrders(productsList, sortSelected);
        setFilteredSegments(sortedOrders);     
    }, [productsList])
    
    function handleFilterProducts(query){
      const nextFilteredProducts = filteredSegments.filter((product) => {
        return product.title
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim());
      }); 
     setFilteredSegments(nextFilteredProducts);
    };   

    function handleQueryChange(query){
      setQuery(query);  
      if (query.length >= 2) {
        handleFilterProducts(query);
      }
      else{
        // setSelected(0);
        const sortedOrders = sortOrders(productsList, sortSelected);
        setFilteredSegments(sortedOrders);
      }        
    };

    function handleQueryClear(){
      handleQueryChange('');
    };  
    
   
      
    const {mode, setMode} = useSetIndexFiltersMode(IndexFiltersMode.Filtering);

    

    const handleSort = useCallback(
      (sortSelected) => {
        setSortSelected(sortSelected);
        const sortedOrders = sortOrders(filteredSegments, sortSelected);
        setFilteredSegments(sortedOrders);
      },
      [sortSelected , filteredSegments]
    );


    const sortOrders = (filteredSegments, sortSelected) => {
      // console.log(sortSelected , "test")
      const [key, direction] = sortSelected[0].split(" ");
      const sortedOrders = [...filteredSegments].sort((a, b) => {
        // console.log(a , b)
        if (key === "price") {     
          const aValue = parseFloat(a.price);
          const bValue = parseFloat(b.price);
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        } else {
          // console.log(a , b )
          // console.log(a[key])
          // console.log(b[key])
          const aValue = a[key].toLowerCase();
          const bValue = b[key].toLowerCase();
          if (aValue < bValue) return direction === "asc" ? -1 : 1;
          if (aValue > bValue) return direction === "asc" ? 1 : -1;
          return 0;
        }
      });
      return sortedOrders;
    };


  
    const resourceName = {
      singular: 'Product',
      plural: 'Products',
    }; 

    const promotedBulkActions = [
      {        
        destructive:true,
        content: [<Button variant="plain" removeUnderline={true} tone="critical" icon={DeleteIcon} >Delete</Button>],
        onAction: () => {
          // console.log("selectedResources" , selectedResources);
          dispatch(deleteRule(selectedResources));
          selectedResources.length = 0
        }
      },
      
    ];


    // const bulkActions = [
    //   {
       
    //   }
    // ]
    

  // const productsData = Paginate(15, filteredSegments , currentPage);
    const emptyStateMarkup = (
    
      filteredSegments && filteredSegments.lenght > 0 ? (
        <Spinner accessibilityLabel="Spinner example" size="large" />
      ):   
      <EmptySearchResult  
        title={'No Product'}
        description={'Try after some time'}
        withIllustration
      />
    );

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(productsList); 
  
console.log(productsList , "list data ");
useEffect(()=>{
     
  // console.log(selectedResources , productsList)
      const selctedProductvalue = productsList.filter((product)=> selectedResources.includes(product.id))
      // console.log(selctedProductvalue)
      setNewProducts(selctedProductvalue);
    }, [selectedResources , productsList])
    const rowMarkup = filteredSegments.map(
      (
        item,
        index,
      ) => (
        <IndexTable.Row
          id={item.id}
          key={item.id}          
          selected={ allResourcesSelected ? selectedResources : selectedResources.includes(item.id) }
          position={index}        
        >
        
          <IndexTable.Cell>
          <Tooltip content={item.title}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
            {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
            </Text>
            </Tooltip>
          </IndexTable.Cell>
          
          <IndexTable.Cell>{item.sku}</IndexTable.Cell>
          <IndexTable.Cell>{item.barcode}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="center" numeric>
            {item.price}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{item.status}</IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack wrap={false} gap="200" >
            <Link   to={`/app/product/${item.product_id}`}>
            <Button  data-Arr={item} icon={EditIcon}></Button>
            </Link>
            {/* Button only show for not shopify users   */}
            {/* <Button disabled={!selctedProducts.includes(item.id)}  icon={DeleteIcon} ></Button> */}
              </InlineStack>
        </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
    // {console.log(productsList.length , selectedResources.length)}
  
    return (

      
      <LegacyCard>

        {status && status == "loading"  ? <SkeletonTabs />: <IndexFilters          
          queryValue={query}
          queryPlaceholder="Searching in all"
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          canCreateNewView={false} 
          autoFocusSearchField={true}
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          onSort={handleSort}               
          tabs={[]}                
          filters={[]}
          appliedFilters={[]}          
          mode={mode}
          setMode={setMode}
          hideFilters
          filteringAccessibilityTooltip="Search (F)"
          
          // sortSelected={sortBy}
          
        />}  
        
        <IndexTable
          emptyState={emptyStateMarkup}
          resourceName={resourceName}
          bulkActions={[
            {onToggleAll: () =>{
              console.log("click")
            }}
          ]}
          
          itemCount={filteredSegments.length}          
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          hasMoreItems
          onSelectionChange={handleSelectionChange}
          headings={[
          {title: 'product'},
          {title: 'Product Sku'},
          {title: 'Barcode'},
          {title: 'Product Cost'},
          {title: 'Status'},
          {title: 'Action'},
          ]}
          promotedBulkActions={promotedBulkActions}
          pagination={{
            hasNext: next_page_url ?   true : false,
            hasPrevious:  prev_page_url ?   true : false,
            onNext: () => {            
                console.log("next")
              dispatch(fetchProducts(next_page_url));
            },
            onPrevious: () =>{
              dispatch(fetchProducts(prev_page_url))
               
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