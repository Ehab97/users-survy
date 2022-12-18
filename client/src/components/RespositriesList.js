"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesList = void 0;
const react_1 = require("react");
const useTypeSelector_1 = require("../utlis/helpers/hooks/useTypeSelector");
const useAction_1 = require("../utlis/helpers/hooks/useAction");
const RepositoriesList = () => {
    const [term, setTerm] = (0, react_1.useState)('');
    const { data, error, loading } = (0, useTypeSelector_1.useTypedSelector)((state) => state.repositories);
    const { searchRepositories } = (0, useAction_1.useAction)();
    const onChange = (event) => {
        setTerm(event.target.value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        searchRepositories(term);
    };
    return (<div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={term}/>
        <button type='submit'>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>loading....</h3>}
      {!error && !loading && (<ul>
        {data.map((item) => <li key={item}>{item}</li>)}
        </ul>)}
    </div>);
};
exports.RepositoriesList = RepositoriesList;
