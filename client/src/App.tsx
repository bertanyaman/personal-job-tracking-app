import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { CreateNewJob, Footer, Header, JobList } from './components';

function App() {
  return (
    <>
      <Header />
      <main>
        <CreateNewJob />
        <JobList />
      </main>
      <Footer />
    </>
  );
}

export default App;
