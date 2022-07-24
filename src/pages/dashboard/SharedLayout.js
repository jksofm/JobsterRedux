import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import styled from "styled-components";
import { useSelector } from "react-redux";

function SharedLayout() {
  const isSidebarOpen = useSelector((store)=>store.user.isSidebarOpen);
  return (
    <Wrapper>
      <main className={`dashboard ${!isSidebarOpen && "toggleSidebar"}`}>
      
          <BigSidebar />
          <SmallSidebar />
        
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default SharedLayout;

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  
  }
 
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .toggleSidebar{
    grid-template-columns: 1fr;

  }
    .dashboard-page {
      width: 90%;
    }
    
  }
`;
