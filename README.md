# StudentsMarksheet

Steps to run the code:

1. Install nodejs on your machine
2. Run the command 'npm install' to install the npm packages
3. Run the command 'npm start' to run the server in the port 3000

Action:

1. add
   post - http://localhost:3000/add
   {
    "studentID": "123",
    "studentName": "kumaran",
    "subject1": "86",
    "subject2": "24",
    "subject3": "35",
    "subject4": "45",
    "subject5": "67"
   }

2. update
   post - http://localhost:3000/update
   {
    "studentID": "123",
    "subject1": "85"
   }

3. delete
   delete - http://localhost:3000/delete
   {
    "studentID": "123"
   }

4. report
   get - http://localhost:3000/report

