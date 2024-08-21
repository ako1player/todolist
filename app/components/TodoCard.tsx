"use client";
import CreateButton from "@/app/components/CreateButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface ITodo {
  id: number;
  name: string;
}

export default function TodoCard() {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast()

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/todo/");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setTodo(data)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function deleteTodo(id: number) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodo(todo.filter((t) => t.id !== id))
      toast({
        title: "Success",
        description: "Todo Item Was Completed",
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="mb-3">
        <CreateButton setTodos={setTodo} todos={todo} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : todo.length === 0 ? (
        <div className="">Try Adding A Todo To Start A List</div>
      ) : (
        todo.map((t) => (
          <Card key={t.id} className="flex items-center justify-between p-2 mb-2">
            <CardContent className="p-0 mr-1">
              <p>{t.name}</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button size="sm" variant="outline" onClick={() => deleteTodo(t.id)} className="">
                Complete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </>
  );
}
