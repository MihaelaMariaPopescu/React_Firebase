import React from 'react';
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export const Navigation = () => {
    return (

      <div class= "menu">
        {/* prettier-ignore */}
        <NavLink to={"/Discover"} class="tabs"> DISCOVER</NavLink>
        {/* prettier-ignore */}
        <NavLink to={"/MySongs"} class="tabs"> My Songs </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/SignIn"} class="tabs"> Sign In/Out </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/AddSong"} class="tabs" > Add Song </NavLink>

        <nav>
    <div class="nav-wrapper">
      <form>
        <div class="input-field">
        <FaSearch />
          <input id="search" type="search" required />
          <label class="label-icon" for="search"></label>
        </div>
      </form>
    </div>
  </nav>
      </div>
       
    );
};
