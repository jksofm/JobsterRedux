import { FormRow, FormRowSelect } from ".";
import styled from "styled-components";
import {updateSearchFilters,clearFilters, getAllJobs} from "../features/allJobs/allJobsSlice";
import { useSelector, useDispatch } from "react-redux";

function SearchContainer() {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
    const {statusOptions,jobTypeOptions} = useSelector((store) => store.job)
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(updateSearchFilters({name, value}));
    if(isLoading){
      return;
    }
    dispatch(getAllJobs());
   
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className="form-center">

        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
        />

        <FormRowSelect labelText="status" name="searchStatus"  value={searchStatus}
          handleChange={handleSearch} list={['all',...statusOptions]} />
          

          <FormRowSelect labelText="Type" name="searchType"  value={searchType}
          handleChange={handleSearch} list={['all',...jobTypeOptions]} />
            <FormRowSelect labelText="sort" name="sort"  value={sort}
          handleChange={handleSearch} list={sortOptions} />
          
        <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
