import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
 const [form, setForm] = useState({
   band: "",
   album: "",
   rating: "",
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ band: "", album: "", rating: "" });
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="band">Band</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.band}
           onChange={(e) => updateForm({ band: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="album">Album</label>
         <input
           type="text"
           className="form-control"
           id="album"
           value={form.position}
           onChange={(e) => updateForm({ album: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="rating">Rating</label>
         <input
           type="text"
           className="form-control"
           id="rating"
           value={form.position}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Upload record"
           className="btn btn-primary btn-lg btn-dark"
         />
       </div>
     </form>
   </div>
 );
}
