import {Card, EmptyState, Page , Link, LegacyCard, DataTable, Icon, InlineGrid, InlineStack, Avatar, Button, IndexTable, Text, BlockStack, Box} from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import ruleEmpty from "../../public/images/ruleEmpty.png"
import {
  EditIcon
} from '@shopify/polaris-icons';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRules } from '../features/rules/rulesSlice';
import { Navigate, useNavigate  , useLocation  } from '@remix-run/react';
import {GetRules} from  "../component/GetRules"
const Index = () => {
  
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);
  const status = useSelector((state) => state.rules.status);
  const error = useSelector((state) => state.rules.error);

console.log(rules ,  status , "datalist ")
  
 const [dataRule , setDataRule ] = useState(rules)
 const [loading , setLoading ] = useState(status == "loading")
 const navigate = useNavigate();
 const location = useLocation(); 
 useEffect(() => {
  
  if (status === 'idle') {  
    
    dispatch(fetchRules());
  }  
 
}, [status, dispatch ]);

useEffect(() => {

  setDataRule(rules)
  setLoading(status === "loading"); 
 },[rules , status])


 useEffect(() => {
  dispatch(fetchRules());
}, [location.pathname, dispatch]);




console.log(loading , "loading")

  // if (status == "loading") {
  //   return <div>Loading...</div>; // Display a loading indicator
  // }


  return (


      loading ? 
      <div>Loading...</div> : 
          <Page title={dataRule && dataRule.length > 0 ? "All Rule" : "Create New Rule" } primaryAction={{ content: "Create New Rules", onAction: ()=>{navigate('/app/rule/create')} }}>
            <BlockStack gap="800">
            {
              (dataRule && dataRule.length > 0) ?  
                <GetRules ruleList={dataRule} setDataRule={setDataRule} loading={loading} />      
               : <EmptyRule />              
            }
            <Box></Box>
            </BlockStack>
          </Page>
  )
}

export default Index


const EmptyRule = () =>{
  return (

  <Card sectioned>
            <EmptyState
                heading="Smart Price Rule data nhi h "
                secondaryAction={{
                    content: 'Repricing History',        
                }}
                action={{
                    content: 'Create New Rules', icon: PlusIcon,
                    onAction: ()=>{navigate('/app/rule/create')},
                }}        
                image="https://cdn.shopify.com/s/files/1/0622/1601/1965/files/ruleEmpty.png?v=1720873673" >
                <p>It seems like no rules or dynamic pricing have been established yet.</p>
            </EmptyState>
        </Card>  

  )
}






// function RuleDataList() {
//   const rows = [
//     [
//       <Link
//         className={""}
//         removeUnderline
//         url="https://www.example.com"
//         key="emerald-silk-gown"
//       >
//         Rule Number 1
//       </Link>,
//       "my price  shuld be  5 %",
      // <InlineStack wrap={false} gap="200" align="end" >

      //   <Button icon={EditIcon}></Button>
      //   <Button icon={DeleteIcon} ></Button>
        
      // </InlineStack>
//     ],
//     [
//       <Link
//         removeUnderline
//         url="https://www.example.com"
//         key="mauve-cashmere-scarf"
//       >
//         Rule Number 2
//       </Link>,
//      "my price Equal to ",
//      ""
//     ],
//     [
//       <Link
//         removeUnderline
//         url="https://www.example.com"
//         key="navy-merino-wool"
//       >
//         Rule Number 3
//       </Link>,
//       "my price Equal to chipest",
//       ""
//     ],
//   ];

//   return (
    
//       <LegacyCard className={"dataTablenew"}>
//         <DataTable className=""
//           columnContentTypes={[
//             'text',
//             "",
//             "text",
//             "",
//             "Action"
//           ]}
//           headings={[<span className="Rulename">Rule name</span> ,  <span>Description</span> ,  
//           <InlineStack  align="end" >          
//           <span className="actions">Action</span>
//           </InlineStack>]}
//           rows={rows}  
//           fixedFirstColumns= {1}
//           firstColumnMinWidth="80%"        
//         />
//       </LegacyCard>
    
//   );
// }



function RuleDataList() {
  const orders = [
    {
      id: "1020",
      order: "testcvzxjhjhggjgjh",
      date: "Jul 20 at 4:34pm",
      status: true, 
    },
    {
      id: "1019",
      order: "cjxgvhjkzhvjkhjkhbjkh djkhjk",
      date: "Jul 20 at 4:34pm",
      status: true,
    },
    {
      id: "1018",
      order: "sdfvbjkjkbhjkhvjkhkjfvjkjkjkbjkn ",
      date: "Jul 20 at 3.44pm",
      status: true,
    },
  ];
  const resourceName = {
    singular: "order",
    plural: "orders",
  
  };

  const rowMarkup = orders.map(({ id, order, date , status , Action }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {order}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{date}</IndexTable.Cell>
      <IndexTable.Cell>{status }</IndexTable.Cell>
      <IndexTable.Cell><InlineStack wrap={false} gap="200" >

<Button icon={EditIcon}></Button>
<Button icon={DeleteIcon} ></Button>

</InlineStack></IndexTable.Cell>
      
    </IndexTable.Row>
  ));

  return (
    <LegacyCard>
      <IndexTable
        // condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={orders.length}
        headings={[{ title: "Rule Name" }, { title: "created Date" } ,{title:"status"} ,  {title:"Action"}]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}