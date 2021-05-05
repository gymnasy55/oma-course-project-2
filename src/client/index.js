async function getFirstUserPersons() {
  const response = await fetch('http://localhost:5000/api/mysql/persons/1')
  const data = await response.json();
  console.log(data)
}

const $user1Btn = document.querySelector('#user1Btn')
$user1Btn.addEventListener('click', getFirstUserPersons)


