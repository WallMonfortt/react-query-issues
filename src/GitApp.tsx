import { FC } from 'react';
import { Outlet } from 'react-router';

export const GitApp: FC = () => {
  
  const url = window.location.href;
  const isInfinite = url.includes('infinite');
  
  return (
    <div className="container mt-3">
    <h1>Git Issues <small>Seguimiento de problemas</small> </h1>
    {/* navigate to infinite view */}
    <button 
      className="btn btn-outline-primary mt-2"
      onClick={ isInfinite ? () => window.location.href = '/issues/list' : () => window.location.href = '/issues/list/infinite' }
    > {isInfinite ? 'Classic Pagination' : 'Infinite Scroll'} </button>
      <Outlet />
    </div>
  )
}

