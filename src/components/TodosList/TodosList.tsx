import { FunctionComponent } from 'react';

// Styles
import './TodosList.scss';
import classNames from 'classnames';

// Types
import { Todo } from '../../types/Todo';

// Components
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[]
};

export const TodosList: FunctionComponent<Props> = ({ todos }) => (
  <ul className="TodosList">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames(
          'TodosList__Item',
          { 'TodosList__Item TodosList__Item--completed': todo.completed }
        )}
      >
        <TodoItem todo={todo} />
      </li>
    ))}
  </ul>
);
