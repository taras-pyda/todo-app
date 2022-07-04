import { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useGetTodosQuery } from '../../store';

// Styles
import './TodoApp.scss';

// Components
import { AddTodo } from '../AddTodo';
import { TodosList } from '../TodosList/TodosList';
import { TodosControls } from '../TodosControls';

export const TodoApp: FunctionComponent = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <section className="TodoApp">
      <AddTodo />

      {!!todos.length && (
        <>
          <Routes>
            <Route path="/" element={<TodosList todos={todos} />} />
            <Route path="/active" element={<TodosList todos={activeTodos} />} />
            <Route path="/completed" element={<TodosList todos={completedTodos} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <TodosControls activeTodos={activeTodos} completedTodos={completedTodos} />
        </>
      )}
    </section>
  );
};
