export const handleErrors = async errors => {
  // переделать через перебор свойств объкта, а пока switch
  const { message } = errors;
  switch (message) {
    case "Request failed with status code 403":
      return { message: "Данный пользователь зарегестрирован" };
      break;
    case "Retry With":
      return { message: "Соси хер" };
      break;
    default:
      return { message: "Попробуйте позже" };
  }
};
