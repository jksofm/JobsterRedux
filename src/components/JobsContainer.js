import { useEffect } from 'react';
import Job from './Job';
import styled from 'styled-components'
import Loading from "./Loading"
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';

function JobsContainer() {
  const {jobs,isLoading,totalJobs,numOfPages} = useSelector((store)=>store.allJobs)
  const dispatch = useDispatch();
   
  useEffect(()=>{
    dispatch(getAllJobs())
  },[])

  if(isLoading){
   return(
    <Wrapper>
     <Loading center />
    </Wrapper>
   );
  
  }
  if(jobs.length ===0 ){
    return(
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
     );
   }
   return <Wrapper>
    <h5> {totalJobs} job{jobs.length > 1 && "s"} found</h5>
    <div className="jobs">
      {jobs.map((job,index)=>{
        return <Job key={index} {...job} />
      })}
    </div>
    {numOfPages > 1 && <PageBtnContainer />}

   </Wrapper>

 
}

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`



export default JobsContainer