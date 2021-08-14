import axios from 'axios';
//TODO implement debouncing with cancel token
function App() {
  let cancelToken = undefined;
  let isInProgress = false;
  let intervalVal=undefined;
  const handleChange = async (e) => {
    const type = e.target.value;
    const a = setTimeout(async () => {
      if (cancelToken !== undefined) {
        cancelToken.cancel('Cancelling request');
      }
      cancelToken = axios.CancelToken.source();
      const res = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1', {
        cancelToken: cancelToken.token,
      });
      console.table(res.data);
      console.log(type)
      isInProgress = false;
    }, 1000);
    if (isInProgress) {
      clearInterval(intervalVal);
    }
    isInProgress = true;
    intervalVal = a;
  };
  return (
    <div>
      <input onChange={handleChange} type='text' placeholder='search here' />
      <p></p>
    </div>
  );
}

export default App;
