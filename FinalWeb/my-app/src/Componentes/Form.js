import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, addDoc, updateDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const studentId = "12345"; // Id del usuario

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description || "");
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      studentId,
      updatedAt: serverTimestamp(),
    };

    if (id) {
      // Actualizar tarea
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, taskData);
    } else {
      // Crear tarea nueva
      taskData.createdAt = serverTimestamp();
      await addDoc(collection(db, "tasks"), taskData);
    }

    navigate("/");
  };

  return (
    <div>
      <h1>{id ? "Editar Tarea" : "Nueva Tarea"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
        <button type="button" onClick={() => navigate("/")}>Cancelar</button>
      </form>
    </div>
  );
};

export default Form;
