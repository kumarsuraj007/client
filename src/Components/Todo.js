import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";

const Todo = () => {
  const [Data, SetData] = useState("");
  const [Value, SetValue] = useState([]);

  const FetchData = async () => {
    const Response = await axios({
      url: "http://localhost:5000/get-content",
      method: "GET",
    });
    console.log(Response.data);
    SetValue(Response.data);
  };

  useEffect(() => {
    FetchData();
  }, []);


  // Function To Add Todo
  const AddTodo = async () => {
    if (Data.length > 0) {
      SetData("");
      const Response = await axios({
        url: "https://mytodoby.herokuapp.com/save-content",
        // url: 'https://mysterious-island-16718.herokuapp.com/save-content',
        method: "POST",
        data: { content: Data },
        headers: {
          "Content-Type": "application/json",
        },
      });
      SetValue([...Value, Response.data]);
    }
  };


  // Function To Remove Todo
  const RemoveTodo = async (_id) => {
    const Response = await axios({
      url: `https://mytodoby.herokuapp.com/delete-content/${_id}`,
      method: "DELETE",
      data: { content: Data },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(Response);
    console.log(Value);
    const FilterData = Value.filter((x) => x._id !== _id);
    SetValue(FilterData);
    console.log(FilterData);
  };


  // To Remove All Todos
  const RemoveAll = async (e) => {
    const Response = await axios({
      url: "https://mytodoby.herokuapp.com/deleteAll-content",
      method: "DELETE",
    });
    console.log({ Response });
    const RemoveList = Value.filter((item) => item.e !== e);
    SetValue(RemoveList);
  };

  return (
    <>
      <div>
        <h1 className="heading">To-Do-List</h1>
        <input
          className="input"
          value={Data}
          onChange={(e) => {
            SetData(e.target.value);
          }}
          type="text"
          placeholder="Write Your Task"
        />
        <button value="Submit" className="btn" onClick={(e) => AddTodo(e)}>
          Add
        </button>
        {Value.map((item) => {
          return (
            <p className="paragraph">
              {item.content}
              <button className="btn-1" onClick={() => RemoveTodo(item._id)}>
                Remove
              </button>
            </p>
          );
        })}

        <button className="btn-2" onClick={(item) => RemoveAll(item.e)}>
          Remove All
        </button>
      </div>
    </>
  );
};

export default Todo;
