// src/components/TaskItem.js
import React from "react";

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div style={{
      border: "1px solid #e1e1e1",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      background: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{task.title}</div>
        {task.description ? <div style={{ fontSize: 13, color: "#555" }}>{task.description}</div> : null}
        <div style={{ marginTop: 6, fontSize: 12, color: "#888" }}>
          {task.createdAt ? new Date(task.createdAt.seconds * 1000).toLocaleString() : "—"}
        </div>
      </div>

      <div style={{ marginLeft: 12, display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(task)} aria-label="Editar">✏️</button>
        <button onClick={() => onDelete(task.id)} aria-label="Eliminar">🗑️</button>
      </div>
    </div>
  );
}
