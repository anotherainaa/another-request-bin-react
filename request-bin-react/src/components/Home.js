import Header from './Header';
import psql from '../services/bins';

import {
  useNavigate
} from 'react-router-dom'



const Home = () => {
  let navigate = useNavigate();

  const handleOnClick = async () => {
    const url = await psql.create();
    navigate(url)
  }

  return (
    <>
      < Header />
      <button onClick={handleOnClick}>Create a bin</button>
    </>
  )
}

export default Home;

// Home.js:14 Uncaught (in promise) TypeError: (0 , _services_bins__WEBPACK_IMPORTED_MODULE_1__.default) is not a function
//     at handleOnClick (Home.js:14:1)
//     at HTMLUnknownElement.callCallback (react-dom.development.js:4161:1)
//     at Object.invokeGuardedCallbackDev (react-dom.development.js:4210:1)
//     at invokeGuardedCallback (react-dom.development.js:4274:1)
//     at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:4288:1)
//     at executeDispatch (react-dom.development.js:9038:1)
//     at processDispatchQueueItemsInOrder (react-dom.development.js:9070:1)
//     at processDispatchQueue (react-dom.development.js:9083:1)
//     at dispatchEventsForPlugins (react-dom.development.js:9094:1)
//     at react-dom.development.js:9285:1


/*
      <NewInvoiceForm
        onSubmit={async (event) => {
          let newInvoice = await createInvoice(
            event.target
          );
          navigate(`/invoices/${newInvoice.id}`);
        }}
      />

*/