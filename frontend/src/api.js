const extractErrorMessage = (errorData) => {
  if (typeof errorData === 'string') {
    return errorData;
  }
  
  if (typeof errorData === 'object' && errorData !== null) {
    if (errorData.message) {
      return errorData.message;
    }
    
    if (typeof errorData === 'object') {
      const errorValues = Object.values(errorData);
      if (errorValues.length > 0) {
        return errorValues[0];
      }
    }
  }
  
  return 'Something went wrong';
};

export const loginUser = async (formData) => {
  const response = await fetch('/api/auth/login', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const responseText = await response.text();
  
  if (!response.ok) {
    let errorData;
    try {
      errorData = JSON.parse(responseText);
    } catch (e) {
      errorData = { message: responseText };
    }
    
    const errorMessage = extractErrorMessage(errorData);
    throw new Error(errorMessage);
  }
  
  return JSON.parse(responseText);
};

export const registerUser = async (formData) => {
  const response = await fetch('/api/auth/register', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const responseText = await response.text();
  
  if (!response.ok) {
    let errorData;
    try {
      errorData = JSON.parse(responseText);
    } catch (e) {
      errorData = { message: responseText };
    }
    
    const errorMessage = extractErrorMessage(errorData);
    throw new Error(errorMessage);
  }
  
  return JSON.parse(responseText);
};

export const fetchUsers = () => {
  return fetch('/api/auth/users', {  
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};