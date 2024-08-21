import TodoCard from "./components/TodoCard";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-3">
      <h1 className="text-3xl">ToDo List</h1>
      <div className="">
        <TodoCard />
      </div>
    </main>
  );
}
