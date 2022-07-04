import { FunctionComponent } from 'react';

// Styles
import './App.scss';

// Components
import { Header } from './components/Header';
import { TodoApp } from './components/TodoApp';
import { Footer } from './components/Footer';

export const App: FunctionComponent = () => {

  return (
    <div className="App">
      <Header />

      <div className="App__Img"></div>

      <main className="App__Content">
        <TodoApp />
      </main>

      <Footer />
    </div>
  );
};
