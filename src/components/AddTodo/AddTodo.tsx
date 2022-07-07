import { FunctionComponent, useState, useMemo } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  userId
} from '../../store';
import classNames from 'classnames';

// Styles
import './AddTodo.scss';

export const AddTodo: FunctionComponent = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const [ addTodo ] = useAddTodoMutation();
  const [ updateTodo ] = useUpdateTodoMutation();
  const [title, setTitle] = useState('');
  const isAllCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const createTodo = async () => {
    if (title) {
      await addTodo({
        userId,
        title,
        completed: false,
      });

      setTitle('');
    };
  };

  const toggleAllTodos = async () => {
    await Promise.all(todos.map(todo => {
      if (todo.completed === isAllCompleted) {
        return updateTodo({
          id: todo.id,
          body: { completed: !isAllCompleted }
        });
      };

      return todo;
    }));
  };

  return (
    <div className="AddTodo">
      {!!todos.length && (
        <button
          type="button"
          className={classNames(
            'AddTodo__Button',
            { 'AddTodo__Button AddTodo__Button--active': isAllCompleted }
          )}
          onClick={() => toggleAllTodos()}
        />
      )}

      <input
        className="AddTodo__Field"
        type="text"
        name="addTodo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value.trimStart())}
        onKeyDown={e => {
          if (e.code === 'Enter') {
            createTodo();
          };
        }}
        onBlur={() => createTodo()}
      />
    </div>
  );
};
