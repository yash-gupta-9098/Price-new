// import React, { useCallback, useEffect, useState } from 'react';
// import { useParams } from '@remix-run/react';
// import axios from 'axios';
// import { useNavigate } from "@remix-run/react";
import NewRule from './app.rule.create';

export default function EditRule() {
//   const { id } = useParams();
//   const [fomState, setFomState] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://dynamicpricing.expertvillagemedia.com/public/api/getrulebyid/${id}`);
//         const data = response.data.data;
//         console.log(data)
//         setFomState(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleChange = useCallback((field, value) => {
//     setFomState(prevState => ({
//       ...prevState,
//       [field]: value
//     }));
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       await axios.post(`https://dynamicpricing.expertvillagemedia.com/public/api/updaterule/${id}`, formState);
//       console.log("Form submitted successfully");
//       navigate(-1); // Navigate back to the previous page after submission
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  return (
    <>
      <NewRule />
    </>
  );
}
