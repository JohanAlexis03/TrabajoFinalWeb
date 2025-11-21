// src/pages/Form.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function Form() {
  const navigate = useNavigate();
  const { id } = useParams(); // si existe -> editar
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const STUDENT_ID = process.env.REACT_APP_STUDENT_ID;
  useEffect(() => {
    if (!STUDENT_ID) {
      alert("REACT_APP_STUDENT_ID no está definido en .env. Debe establecer su matrícula.");
    }
  }, [STUDENT_ID]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const d = await getDoc(doc(db, "tasks", id));
        if (d.exists()) {
          const data = d.data();
          setTitle(data.title || "");
          setDescription(data.description || "");
        } else {
          alert("Item no encontrado.");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        alert("Error cargando item.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("El campo title es obligatorio.");
      return;
    }
    if (!STUDENT_ID) {
      alert("studentId (REACT_APP_STUDENT_ID) no configurado.");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        // actualizar: updatedAt
        await updateDoc(doc(db, "tasks", id), {
          title: title.trim(),
          description: description.trim() || "",
          updatedAt: serverTimestamp()
        });
      } else {
        // crear: studentId, createdAt, updatedAt
        await addDoc(collection(db, "tasks"), {
          title: title.trim(),
          description: description.trim() || "",
          studentId: String(STUDENT_ID),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error guardando item. Revisa consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>{id ? "Editar item" : "Crear item"}</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <label>
          Title (obligatorio)
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description (opcional)
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
          <button type="button" onClick={() => navigate("/")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
