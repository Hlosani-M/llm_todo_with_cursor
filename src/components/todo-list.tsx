"use client"

import type React from "react"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, newTodoItem])
    setNewTodo("")
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    if (editingId === id) {
      setEditingId(null)
    }
  }

  // Start editing a todo
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Toggle todo completion
  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">My Todo List</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        {/* Add Todo Form */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={addTodo} className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Add Task</Button>
            </form>
          </CardContent>
        </Card>

        {/* Todo List */}
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        {todos.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li key={todo.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  {editingId === todo.id ? (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button onClick={() => saveEdit(todo.id)}>Save</Button>
                      <Button variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <span className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => startEditing(todo)} aria-label="Edit task">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          aria-label="Delete task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-4 px-6 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Todo List App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

