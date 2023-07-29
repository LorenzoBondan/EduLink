import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Subjects = () => {
  return (
    <Switch>
      <Route path="/admin/subjects" exact>
        <List/>
      </Route>
      <Route path="/admin/subjects/:subjectId">
        <Form/>
      </Route>
    </Switch>
  );
};


export default Subjects;