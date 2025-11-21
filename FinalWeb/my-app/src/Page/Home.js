
// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.error("Firestore listen error:", err);
    });

    return () => unsub();
  }, []);

  const handleEdit = (task) => {
    navigate(`/form/${task.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este item?")) return;
    try {
      await deleteDoc(doc(db, "tasks", id));
      // onSnapshot actualizará la lista automáticamente
    } catch (err) {
      console.error(err);
      alert("Error eliminando. Revisa consola.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Lista de items</h3>
        <button onClick={() => navigate("/form")}>+ Nuevo</button>
      </div>

      {tasks.length === 0 ? (
        <p>No hay items.</p>
      ) : (
        tasks.map(t => (
          <TaskItem key={t.id} task={t} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
