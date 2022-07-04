import { FunctionComponent, useState } from 'react';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../../store';
import classNames from 'classnames';

// Styles
import './TodoItem.scss';

// Types
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: FunctionComponent<Props> = ({ todo }) => {
  const [hovered, setHovered] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [visibleTitle, setVisibleTitle] = useState(title);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const updateTodoTitle = async () => {
    if (visibleTitle === title) {
      setEdit(false);
      return;
    };

    await updateTodo({
      id: todo.id,
      body: {
        title: visibleTitle,
      },
    });

    setTitle(visibleTitle);
    setEdit(false);
  };

  return (
    <div
      className="TodoItem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!edit && (
        <button
          className={classNames(
            'TodoItem__Check',
            { 'TodoItem__Check TodoItem__Check--completed': todo.completed }
          )}
          onClick={() => updateTodo({
            id: todo.id,
            body: { completed: !todo.completed }
          })}
        />
      )}

      {edit ? (
        <input
          className="TodoItem__Input"
          type="text"
          autoFocus
          value={visibleTitle}
          onChange={e => setVisibleTitle(e.target.value)}
          onKeyDown={e => {
            switch (e.code) {
              case 'Enter':
                updateTodoTitle();
                break;

              case 'Escape':
                setVisibleTitle(title);
                setEdit(false);
                break;

              default:
                break;
            }
          }}
          onBlur={() => updateTodoTitle()}
        />
      ) : (
        <p
          className="TodoItem__Title"
          onDoubleClick={() => setEdit(true)}
        >
          {todo.title}
        </p>
      )}

      {hovered && (
        <button
          className="TodoItem__Delete"
          onClick={() => deleteTodo(todo.id)}
        />
      )}
    </div>
  );
};
