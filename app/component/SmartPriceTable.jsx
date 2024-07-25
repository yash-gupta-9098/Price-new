import {
    TextField,
    IndexTable,
    LegacyCard,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    ChoiceList,
    RangeSlider,
    Badge,
    useBreakpoints,
    Tooltip,
    EmptySearchResult,
  } from "@shopify/polaris";
  // import enJson from '@shopify/polaris/locales/en.json' assert { type: 'json' };
  import { useState, useCallback } from "react";
  
  function SmartPriceTable({responseProduct , setResponseProduct}) {
    const sleep = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const [itemStrings, setItemStrings] = useState([
      "All",
      "Unpaid",      
    ]);
  
    const tabs = itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 0,
    }));
    const [selected, setSelected] = useState(0);
  
    const { mode, setMode } = useSetIndexFiltersMode();
    const onHandleCancel = () => {};
  
    const onHandleSave = async () => {
      await sleep(1);
      return true;
    };
  
    const [accountStatus, setAccountStatus] = useState(
      undefined
    );
    const [moneySpent, setMoneySpent] = useState(
      undefined
    );
    const [taggedWith, setTaggedWith] = useState("");
    const [queryValue, setQueryValue] = useState("");
  
    const handleAccountStatusChange = useCallback(
      (value) => setAccountStatus(value),
      []
    );
    const handleMoneySpentChange = useCallback(
      (value) => setMoneySpent(value),
      []
    );
    const handleTaggedWithChange = useCallback(
      (value) => setTaggedWith(value),
      []
    );
    const handleFiltersQueryChange = useCallback(
      (value) => setQueryValue(value),
      []
    );
    const handleAccountStatusRemove = useCallback(
      () => setAccountStatus(undefined),
      []
    );
    const handleMoneySpentRemove = useCallback(
      () => setMoneySpent(undefined),
      []
    );
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
    const handleFiltersClearAll = useCallback(() => {
      handleAccountStatusRemove();
      handleMoneySpentRemove();
      handleTaggedWithRemove();
      handleQueryValueRemove();
    }, [
      handleAccountStatusRemove,
      handleMoneySpentRemove,
      handleQueryValueRemove,
      handleTaggedWithRemove,
    ]);
  
    const filters = [
      {
        key: "accountStatus",
        label: "Account status",
        filter: (
          <ChoiceList
            title="Account status"
            titleHidden
            choices={[
              { label: "Enabled", value: "enabled" },
              { label: "Not invited", value: "not invited" },
              { label: "Invited", value: "invited" },
              { label: "Declined", value: "declined" },
            ]}
            selected={accountStatus || []}
            onChange={handleAccountStatusChange}
            allowMultiple
          />
        ),
        shortcut: true,
      },
      {
        key: "taggedWith",
        label: "Tagged with",
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={handleTaggedWithChange}
            autoComplete="off"
            labelHidden
          />
        ),
        shortcut: true,
      },
      {
        key: "moneySpent",
        label: "Money spent",
        filter: (
          <RangeSlider
            label="Money spent is between"
            labelHidden
            value={moneySpent || [0, 500]}
            prefix="$"
            output
            min={0}
            max={2000}
            step={1}
            onChange={handleMoneySpentChange}
          />
        ),
      },
    ];
  
    // const orders = [
    //   {
    //     id: "1020",
    //     order: (
    //       <Text as="span" variant="bodyMd" fontWeight="semibold">
    //         #1020
    //       </Text>
    //     ),
    //     date: "Jul 20 at 4:34pm",
    //     customer: "Jaydon Stanton",
    //     total: "$969.44",
    //     paymentStatus: <Badge progress="complete">Paid</Badge>,
    //     fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    //   },
    //   {
    //     id: "1019",
    //     order: (
    //       <Text as="span" variant="bodyMd" fontWeight="semibold">
    //         #1019
    //       </Text>
    //     ),
    //     date: "Jul 20 at 3:46pm",
    //     customer: "Ruben Westerfelt",
    //     total: "$701.19",
    //     paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    //     fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    //   },
    //   {
    //     id: "1018",
    //     order: (
    //       <Text as="span" variant="bodyMd" fontWeight="semibold">
    //         #1018
    //       </Text>
    //     ),
    //     date: "Jul 20 at 3.44pm",
    //     customer: "Leo Carder",
    //     total: "$798.24",
    //     paymentStatus: <Badge progress="complete">Paid</Badge>,
    //     fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    //   },
    // ];
    const resourceName = {
      singular: "product",
      plural: "products",
    };
  
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
      useIndexResourceState(responseProduct);
  // { id, product_title, product_id, product_price,competiorhighprice , competiorlowprice},
    const rowMarkup = responseProduct.map(
      (
        { id, product_title, product_id, product_price,competiorhighprice , competiorlowprice},
        index
      ) => (
        <IndexTable.Row
          id={id}
          key={product_id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell> 
            <Tooltip content={product_title}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {product_title.length > 30 ? `${product_title.slice(0, 30)}...` : product_title}        
            </Text>
            </Tooltip>
          </IndexTable.Cell>
          <IndexTable.Cell>{product_price}</IndexTable.Cell>
          <IndexTable.Cell>{competiorlowprice}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" alignment="center"  numeric>
              12
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{competiorhighprice}</IndexTable.Cell>
          <IndexTable.Cell>-</IndexTable.Cell>  
        </IndexTable.Row>
      )
    );
   

    const emptyStateMarkup = (      
      <EmptySearchResult  
        title={'No Product'}
        description={'Try after some time'}
        withIllustration
      />
    );

    return (
      <LegacyCard>
        {/* <IndexFilters
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => setQueryValue("")}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          canCreateNewView={false}
          // onCreateNewView={onCreateNewView}
          hideFilters
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        /> */}
        <IndexTable
          selectable={false}
          emptyState={emptyStateMarkup}
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={responseProduct.length}
          lastColumnSticky
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product Title" },
            { title: "Product Price" },
            { title: "Cheapest competitor" },
            { title: "Average"},
            { title: "Highest competitor" },
            { title: "Smart Price" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
        
      </LegacyCard>
    );
  
    // function disambiguateLabel(key: string, value: string | any[]): string {
    //   switch (key) {
    //     case "moneySpent":
    //       return `Money spent is between $${value[0]} and $${value[1]}`;
    //     case "taggedWith":
    //       return `Tagged with ${value}`;
    //     case "accountStatus":
    //       return (value as string[]).map((val) => `Customer ${val}`).join(", ");
    //     default:
    //       return value as string;
    //   }
    // }
  
    // function isEmpty(value: string | string[]): boolean {
    //   if (Array.isArray(value)) {
    //     return value.length === 0;
    //   } else {
    //     return value === "" || value == null;
    //   }
    // }
  }
  
  export default SmartPriceTable;
  