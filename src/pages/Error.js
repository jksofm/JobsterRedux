import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";
import img from '../assets/images/not-found.svg'

function Error() {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
         <h3>Ohh! Page Not Found</h3>
         <p>We can't seem to find the page you are looking for</p>
         <Link to = '/' >back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error


const Wrapper = styled.main`
  text-align: center;
  img {
    max-width: 300px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }

  @media (min-width: 792px){
    img{
      max-width : 600px
    }
  }
`

