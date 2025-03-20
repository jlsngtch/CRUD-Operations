if (departments.length > 0) {
  departments.forEach((eachdepartment) => {
    <h3>{eachdepartment.department}</h3>;
  });
} else {
  console.log("No listed departments");
}




<% if (<%= user.department %> == <%= department.department %> ) { %>
  <h3><%= eachuser.name %> <%= eachuser.surname %></h3>
<% } else { %>
  <p>No member in this department!</p>
<% } %>


<% if(<%= user.department %> == <%= department.department %>) { %> 
  <% users.forEach(eachuser => { %>
  <a class="single" href="/department/<%= eachuser.id %>">
    <h3 class="title"><%= eachuser.name %> <%= eachuser.surname %> </h3>
    
  </a>

  <% }) %> 
  <% } else { %>
  <p>There are no users to display.</p>

  <% } %>