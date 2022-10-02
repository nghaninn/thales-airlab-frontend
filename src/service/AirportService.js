export const getAllAirport = () =>  {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("localhost:8080/v1/data", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}