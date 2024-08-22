export const AddScoreMichi = async (id) => {
  const response = await fetch(`/api/AddScore/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  const result = await response.json();
  return result;
};

export const GetAllMichis = async () => {
  const response = await fetch("/api/GetMichis");
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};

export const DeleteMichi = async (id) => {
  const response = await fetch(`/api/DeleteMichis/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the document");
  }

  const result = await response.json();
  return result;
};

export const NewMichi = async (newObject) => {
  const response = await fetch("/api/NewMichis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  });

  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }

  const data = await response.json();
  return data;
};



export const UptadeMichi = async (getid,EditMichisObject) => {
   
      const response = await fetch(`/api/EditMichis/${getid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EditMichisObject),
      });

      if (!response.ok) {
        throw new Error("Failed to update the document");
      }

      const result = await response.json();
     return result
   
  };




  export const GetIdMichi = async (getid) => {
    
      const response = await fetch(`/api/GetMichis/${getid}`);
      if (!response.ok) {
        throw new Error("Document not found");
      }
      const result = await response.json();
   return result
  };