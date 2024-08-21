"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ITodo {
  id: number;
  name: string;
}

interface ICreateButtonProps {
  setTodos: (todos: ITodo[]) => void;
  todos: ITodo[];
}

export default function CreateButton({ setTodos, todos }: ICreateButtonProps) {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: { name: string }) {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create data");
      }
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      form.reset();
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Todo Item" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add A Todo Item"}</Button>
        </form>
      </Form>
    </div>
  );
}
