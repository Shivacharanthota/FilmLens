// reducers/movieReducer.js
const initialState = 492261; // Default movie ID

const movieidnum = (state = initialState, action) => {
  console.log('Movie ID Updated:', action.payload);
  switch (action.type) {
    case 'MOVIE':
      return action.payload; // Update state with the new movie ID
    default:
      return state; // Return current state if action is not matched
  }
};

export default movieidnum;
