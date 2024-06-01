/* eslint-disable react/prop-types */


const PrivateRoute = ({ children }) => {


 
 
  return user ? (
    <div>{ children }</div>
) : (
    <Navigate to={ '/login' } />
)
};

export default PrivateRoute;
