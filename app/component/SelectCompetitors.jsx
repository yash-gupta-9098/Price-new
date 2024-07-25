import React from "react" 
import { Autocomplete, Tag, LegacyStack, Text, Icon, TextContainer, TextField, InlineStack, Box, BlockStack } from "@shopify/polaris";
import { useState, useCallback, useEffect, useMemo } from "react";
import {SearchIcon} from "@shopify/polaris-icons"

function SelectCompetitors(props) {
  const { type, domainList, products, name, errorMessage, fomState, setFomState, children, validation, error } = props
  const paginationInterval = 10;
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [dataBaseInput, setDataBaseInput] = useState([])
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(paginationInterval);


  //   const deselectedOptions = useMemo(() => {
  //     console.log(type, '3333333333333')
  //     console.log(domainList, products, '555555555555555555')
  //     type === 'domainList'?   
  //       domainList.map((item)=> ({"value": item.domain_name , "label": item.domain_name , "id":item.id})): 
  //       products.map((item)=>({"value": item.product_title , "label": item.product_title , "id":item.product_id}))
  
  // }, [type])
  
  // const deselectedOptions =
  //   type === 'domainList' ?   
  //     domainList.map((item)=> ({"value": item.domain_name , "label": item.domain_name , "id":item.id})): 
  //     products.map((item)=>({"value": item.product_title , "label": item.product_title , "id":item.product_id}))
  

  
  const deselectedOptions =
    type === 'domainList' ?
      domainList.map((item) => ({ "value": item.domain_name, "label": item.domain_name, "id": item.id })) :
      products.map((item) => ({ "value": item.product_title, "label": item.product_title, "id": item.product_id }))
  

  useEffect(() => {
    setOptions(deselectedOptions)
  }, [])

  // console.log(options, '444444444444444444')
  

  // useEffect(()=>{
  //   if(fomState[name] !== null){
  //   console.log(fomState[name])
  //     const competitorIds = JSON.parse(fomState[name])
  //   setInputValue(competitorIds)
  //   }
  // },[])

  useEffect(() => {
  
    if (fomState[name] !== null && fomState[name] != []) {
      let competitorIds;
      if (typeof fomState[name] === 'string') {
        competitorIds = fomState[name].replace(/["[\]\/\\]/g, '');
        competitorIds = competitorIds.split(',').map(Number);
        // console.log(competitorIds, 'if')
      } else {
        // console.log(fomState[name], '11111111111')
        competitorIds = JSON.parse(fomState[name] ? fomState[name] : "");
      }
      // console.log(fomState[name], competitorIds, 'comp select')
      // console.log(competitorIds, '77777777777777777');
      setDataBaseInput(competitorIds)
      // setSelectedOptions(competitorIds)
      // setInputValue((prev) => {
      //   console.log(prev, '88888888888888888')
      //   if (prev == '') {
      //     return competitorIds;
      //   }
      //   else {
      //    prev.filter((item) => !competitorIds.includes(item))
      //   }
      //   // [...prev, competitorIds]
      // }
      // )   
      setInputValue(competitorIds);
      const data = deselectedOptions.filter(item => { if (competitorIds.includes(item.id)) return item.value })
    
      const namesArray = data.map(item => item.label);
      // console.log(namesArray , "name array ")    
      setSelectedOptions(namesArray)
      // updateSelection(namesArray)
    }
  


  }, [type, name])


//   useEffect(() => {
  
//     console.log(name+"ddd", inputValue, typeof inputValue, 'inputValue')
//     setFomState(prev => {
//       console.log(prev, 'hiiiiiiiii')
//       let products_id;
//       let selected_competiors;
//       if (name === 'competiors_select') {
//         products_id = prev.product_ids.replace(/['"\[\]]/g, '').split(',').map(Number);
//         console.log(products_id, 'products_id')
//       } else if (name === 'product_ids') {
//         selected_competiors = prev.competiors_select;
//         // selected_competiors = prev.competiors_select.replace(/['"\[\]]/g, '').split(',').map(Number);
//         // console.log(selected_competiors, 'selected_competiors')
//       } 
//       return {
//         ...prev,
//         product_ids: (inputValue.length > 0  && [name] == 'product_ids') ? inputValue : products_id,
//         competiors_select: (inputValue.length > 0 && [name] == 'competiors_select') ? inputValue : selected_competiors
//       }
// })
//   // setFomState({...fomState , [name]: inputValue});
  
  
  // },[setSelectedOptions , selectedOptions  , setInputValue , inputValue , name])
  
  useEffect(() => {
  setFomState(prev => {
    let products_id = prev.product_ids;
    let selected_competiors = prev.competiors_select;

    if (typeof products_id === 'string') {
      products_id = products_id.replace(/['"\[\]]/g, '').split(',').map(Number);
    }
    if (typeof selected_competiors === 'string') {
      selected_competiors = selected_competiors.replace(/['"\[\]]/g, '').split(',').map(Number);
    }

    if (name === 'competiors_select') {
      selected_competiors = inputValue;
    } else if (name === 'product_ids') {
      products_id = inputValue;
    }

    return {
      ...prev,
      product_ids: products_id,
      competiors_select: selected_competiors,
    };
  });
}, [setSelectedOptions, selectedOptions, setInputValue, inputValue, name]);
 




  const handleLoadMoreResults = useCallback(() => {
    // if (willLoadMoreResults) {
    //   setIsLoading(true);

    //   setTimeout(() => {
    //     const remainingOptionCount = options.length - visibleOptionIndex;
    //     const nextVisibleOptionIndex =
    //       remainingOptionCount >= paginationInterval
    //         ? visibleOptionIndex + paginationInterval
    //         : visibleOptionIndex + remainingOptionCount;

    //     setIsLoading(false);
    //     setVisibleOptionIndex(nextVisibleOptionIndex);

    //     if (remainingOptionCount <= paginationInterval) {
    //       setWillLoadMoreResults(false);
    //     }
    //   }, 1000);
    // }
  }, [willLoadMoreResults, visibleOptionIndex]); 
 
  const removeTag = useCallback( 
    (tag , removeid) => () => {     
      
      // console.log(tag , removeid, "TAG")/ 
      const option = [...selectedOptions];
      option.splice(option.indexOf(tag), 1);
      setSelectedOptions(option)

      const selectedValue = inputValue.filter((item)=>(item !== removeid))
      // console.log( selectedValue , "selectedValue updateSelection")
        setInputValue(selectedValue)

        // console.log( inputValue)
      // console.log(selectedOptions);
      // const selectedValue = selectedOptions.map((selectedItem) => {
      //   const matchedOption = options.find((option) => {
      //     return option.value.match(selectedItem);
      //   });
      //   return matchedOption && matchedOption.id;
      // });    


      // setSelectedOptions(selectedValue);
      // console.log(selectedValue , "value");
    },
    [selectedOptions]
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
         option.label.match(filterRegex)
      );

      setOptions(resultOptions);
      // setInputValue;      
      
    },
    [deselectedOptions]
  );


  // const verticalContentMarkup =
  //   selectedOptions.length > 0 ? (
  //     <LegacyStack spacing="extraTight" alignment="center">
  //       {selectedOptions.map((option) => {
  //         let tagLabel = '';
  //         tagLabel = option.replace('_', ' ');
  //         tagLabel = titleCase(tagLabel);
  //         return (
  //           <Tag key={`option${option}`} onRemove={removeTag(option)}>
  //             {tagLabel}
  //           </Tag>
  //         );
  //       })}
  //     </LegacyStack>
  //   ) : null;  

 

  const hasSelectedOptions = selectedOptions.length > 0;
  const emptyState = (
    <>
      <Icon source={SearchIcon} />
      <div style={{textAlign: 'center'}}>
        <TextContainer>Could not find any results</TextContainer>
      </div>
    </>
  );
  
  const tagsMarkup =  
  
  hasSelectedOptions
    ? selectedOptions.map((option , i) => {      
        // console.log(option,'qqqqqqqqqqqqqqqqqqqq')
        let tagLabel = "";
        tagLabel = option.replace("", "");
        tagLabel = titleCase(tagLabel);
        // console.log( i ,   inputValue[i] , "indexing")
        return (
          <Tag key={`option${option}`} onRemove={removeTag(option , inputValue[i])}>
            {tagLabel}
          </Tag>
        );
      })
      : null;
  
  // console.log(hasSelectedOptions, tagsMarkup, 'wwwwwwwwwwwwwww')



  // const optionList = options.slice(0, visibleOptionIndex);
  
  const selectedTagMarkup = hasSelectedOptions ? (
    <LegacyStack spacing="extraTight">{tagsMarkup}</LegacyStack>
  ) : null;

// const selctedLoad  = useCallback((e , id)=>{

//   console.log(e , e.id , id)
  
//   // console.log(fomState);
//   // setFomState({...fomState, name: selectedOptions })
// }, [])





const updateSelection = useCallback(
  (selected) => {
    console.log(selected,  typeof selected, '11111111111111')
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.id;
    });    
    
    setSelectedOptions(selected);
    setInputValue(selectedValue);
    // console.log(selectedValue,  typeof selectedValue,  "selectedValue updateSelection") 
    // console.log( dataBaseInput , "dataBaseInput updateSelection")   
    // console.log( inputValue , "inputValue updateSelection")   
    
    
    // const mergedArray = Array.from(new Set([...dataBaseInput, ...selectedValue]));
    // // setInputValue();    
    // console.log(mergedArray , " value")
    // setInputValue(mergedArray);
    // setFomState(prev => ({...prev , [name]: selectedValue}));
    // validation({fomState})    
    
  },
  [options, setInputValue , inputValue ,name]
);



const textField = (
  <>
  <BlockStack gap="200">
  <Autocomplete.TextField
    onChange={updateText}
    label=""
    value=""
    placeholder={
       "Select Competitors"
    }
    autoComplete="off"
    error ={error ? errorMessage : false}
  />
  {children}
  <Box  >{selectedTagMarkup} </Box  >
  <TextField 
  variant="borderless"
    type="hidden"
    onChange={updateText}
    label=""
    value={inputValue}
    placeholder= "Select Competitors"      
    autoComplete="off"
    name={name}
  />
  </BlockStack>
  </>
);



  return (
    <LegacyStack vertical>   
    
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={updateSelection}
        listTitle={options !="" ? "Suggested Url" : ""}
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
        preferredPosition= "below"
        emptyState={emptyState}
      />
      
    </LegacyStack>
  );

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }
}

export default SelectCompetitors;
