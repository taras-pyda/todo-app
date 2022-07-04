import { FunctionComponent } from 'react';
import { useDeleteTodoMutation } from '../../store';

// Styles
import './TodosControls.scss';

// Types
import { Todo } from '../../types/Todo';

// Components
import { Nav } from '../Nav';

type Props = {
  activeTodos: Todo[];
  completedTodos: Todo[];
};

export const TodosControls: FunctionComponent<Props> = ({ activeTodos, completedTodos }) => {
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <div className="TodosControls">
      <p>
        {`${activeTodos.length} item${activeTodos.length > 1 ? 's' : ''} left`}
      </p>

      <Nav />

      {!!completedTodos.length && (
        <button
          type="button"
          className="TodosControls__Button"
          onClick={() => Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))}
        >
          Clear completed
        </button>
      )}
    </div>
  );
};
