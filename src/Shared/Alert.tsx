import { AlertComponent } from '../types';
/**
 * Alert renders text to show user errors or success upon form submission
 * 
 * Props:
 * alerts: Array of alert strings to be displayed
 * type: string for type of alert i.e. success, info, error, warning
 * 
 * {LoginForm, SignupForm, ProfilePage} -> Alert
 */
function Alert({ alerts, type } : AlertComponent) {

  
  switch(type) {
    case "info":
      return (
        <div role="alert">
          {alerts.map(alert => 
          <p 
            role="alert" 
            className="alert alert-info my-4 flex justify-center w-96 text-center
              transition-all	ease-out opacity-70" 
            key={alert}>{alert}</p>
          )}
        </div>
      );

    case "warning":
      return (
        <div role="alert">
          {alerts.map(alert => 
          <p 
            role="alert" 
            className="alert alert-warning my-4 flex justify-center w-96 text-center
            transition-all	ease-out opacity-70" 
            key={alert}>{alert}</p>
          )}
        </div>
      );

    case "success":
      return (
        <div role="alert">
          {alerts.map(alert => 
          <p 
            role="alert" 
            className="alert alert-success my-4 flex justify-center w-96 text-center
            transition-all	ease-out opacity-70"
            key={alert}>{alert}</p>
          )}
        </div>
      );

    case "error":
      return (
        <div role="alert">
          {alerts.map(alert => 
          <p 
            role="alert" 
            className="alert alert-error my-4  flex justify-center w-96 text-center
            transition-all	ease-out opacity-70" 
            key={alert}>{alert}</p>
          )}
        </div>
      );

      default:
              return (
        <div role="alert">
          {alerts.map(alert => 
          <p 
            role="alert" 
            className="alert my-4  flex justify-center w-96 text-center 
            transition-all	ease-out opacity-70" 
            key={alert}>{alert}</p>
          )}
        </div>
      );

  }
}
export default Alert;