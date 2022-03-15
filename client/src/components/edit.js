import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
 const [form, setForm] = useState({
   band: "",
   album: "",
   rating: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }

     setForm(record);
   }

   fetchData();

   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     band: form.band,
     album: form.album,
     rating: form.rating,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="band">Band: </label>
         <input
           type="text"
           className="form-control"
           id="band"
           value={form.band}
           onChange={(e) => updateForm({ band: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="album">Album: </label>
         <input
           type="text"
           className="form-control"
           id="album"
           value={form.album}
           onChange={(e) => updateForm({ album: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="rating">Rating: </label>
         <input
           type="text"
           className="form-control"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>
       <br />

       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary btn-lg btn-dark"
         />
       </div>
     </form>
   </div>
 );
}
