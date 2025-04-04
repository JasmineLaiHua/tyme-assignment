import { RouterProvider } from 'react-router-dom';
import { notification } from 'antd';
import { router } from './routes/routes';
import { useEffect } from 'react';

const REFRESH_INTERVAL = 120000;
const NOTIFICATION_BEFORE_REFRESH = 5000;

function App() {
  /**
   * Uncomment below code block to experiment the auto refresh feature
   *
   */
  // useEffect(() => {
  //   const showNotification = () => {
  //     notification.info({
  //       message: 'Auto Refresh',
  //       description: 'The page will refresh in 5 seconds',
  //       duration: 4.5,
  //       placement: 'bottomRight',
  //     });
  //   };

  //   const refreshInterval = setInterval(() => {
  //     showNotification();

  //     setTimeout(() => {
  //       window.location.reload();
  //     }, NOTIFICATION_BEFORE_REFRESH);

  //   }, REFRESH_INTERVAL);

  //   return () => {
  //     clearInterval(refreshInterval);
  //   };
  // }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
