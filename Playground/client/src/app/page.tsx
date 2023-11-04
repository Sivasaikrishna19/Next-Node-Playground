"use client";
import { DeleteTwoTone } from "@ant-design/icons";
import { Badge, Button, DatePicker, Input, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Array<any>>();
  const [todo, setTodo] = useState<string>();
  const [priority, setPriority] = useState<string>();
  const [deadline, setDeadline] = useState<string>();

  const postTodoFunction = () => {
    axios
      .post("http://localhost:5000/todos/create", {
        title: todo,
        priority: priority,
        deadline: deadline,
      })
      .then((res) => {
        getAllTodos();
        setDeadline(undefined);
        setPriority(undefined);
        setTodo(undefined);
      });
  };
  const getAllTodos = () => {
    axios.get("http://localhost:5000/todos").then((res) => {
      setTodos(res.data);
      console.log(res);
    });
  };
  const deleteTodo = (id: string) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then((res) => {
        console.log("Todo deleted successfully");
        getAllTodos();
      })
      .catch((error) => {
        console.error("Error deleting the todo:", error);
      });
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const getColor = (priority: string) => {
    if (priority == "low") return "cyan";
    else if (priority == "medium") return "volcano";
    else if (priority == "high") return "red";
  };
  const getPriorityText = (priority: string) => {
    if (priority == "low") return "Low";
    else if (priority == "medium") return "Medium";
    else if (priority == "high") return "High";
  };

  return (
    <div className="p-8 ">
      <div className="flex w-full justify-center mb-4">
        {" "}
        <div className="font-semibold text-[24px]">To Do List</div>
      </div>

      <div className="flex  justify-center w-[50%] items-center m-auto">
        <Input
          placeholder="Input Todo..."
          className=" w-full"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />{" "}
        <Select
          className="mx-2"
          placeholder="Select Priority"
          value={priority}
          onChange={(e) => {
            setPriority(e);
          }}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
        {/* <DatePicker
          className="w-full"
          placeholder="Deadline"
          onChange={(e) => {
            console.log(e);
            setDeadline(e?.toISOString());
          }}
        /> */}
        <Button
          type="primary"
          className="ml-2"
          onClick={() => {
            console.log("Click");
            postTodoFunction();
          }}
        >
          Add
        </Button>
      </div>
      <div className="m-auto mt-4 w-[60%]">
        {todos?.map((todo) => {
          return (
            <Badge.Ribbon
              text={getPriorityText(todo.priority)}
              color={getColor(todo.priority)}
            >
              <div className="mb-2 border-[1px] border-solid border-[#e0e0e0] p-4 rounded-md flex justify-between">
                <div className="flex items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      deleteTodo(todo._id);
                    }}
                  >
                    <DeleteTwoTone className="text-[16px]" />
                  </span>
                  <span className="ml-2">{todo.title}</span>
                </div>
                {/* <div className="flex items-center mr-4 pr-12">
                  By {dayjs(todo.deadline).format("MMMM D, YYYY")}
                </div> */}
              </div>
            </Badge.Ribbon>
          );
        })}
      </div>
    </div>
  );
}
