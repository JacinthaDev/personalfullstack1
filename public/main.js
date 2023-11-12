const edit = document.getElementsByClassName("fa-pen-to-square");
const trash = document.getElementsByClassName("fa-trash");
const updateButton = document.getElementById("update-button")

updateButton.addEventListener('click', updateAppointment)

//FreeCodeCamp for the line below
let currentDate = new Date().toJSON().slice(0, 10)


document.getElementById('first-date').setAttribute('min', currentDate)

Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        const appointment = element.closest('li')
        const id = appointment.childNodes[1].innerText
        const name = appointment.childNodes[3].innerText
        const reason = appointment.childNodes[5].innerText
        const date = appointment.childNodes[12].innerText

        document.getElementById('update-form').classList.toggle('hidden')
        document.getElementById('update-id').value = id
        document.getElementById('update-name').value = name
        document.getElementById('update-reason').value = reason
        document.getElementById('update-date').value = date
        document.getElementById('update-date').setAttribute('min', currentDate)


      });
});


function updateAppointment(event){
  event.preventDefault()
  event.stopPropagation() //stop the form from taking it's default action of GET and stop the submit button from submitting 

  document.getElementById('update-form').classList.toggle('hidden')

  fetch('appointments', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': document.getElementById('update-name').value,
      'reason': document.getElementById('update-reason').value,
      'date': document.getElementById('update-date').value,
      'id': document.getElementById('update-id').value
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    window.location.reload(true)
  })
}


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const appointment = element.closest('li')
        const id = appointment.childNodes[1].innerText
        const name = appointment.childNodes[3].innerText
        const reason = appointment.childNodes[5].innerText
        const date = appointment.childNodes[7].innerText

        fetch('appointments', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'reason': reason,
            'date': date
          })
        }).then(function (response) {
          appointment.remove()
          window.location.reload()
        })
      });
});
