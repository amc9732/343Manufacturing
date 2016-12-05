Manufacturing and Human Resources Silos
Made by:  Austin Gardner, Austin Wolf, Austin Cowan, Maranda Destefano, Joshua Tobin

To use the system you can either set up the system locally using the instructions below or access the
system at the following addresses:

    Human Resources: http://vm343d.se.rit.edu:3000/

    Manufacturing: http://vm343d.se.rit.edu:3001/

**************** Instructions for local setup ****************

1. To begin using this application, please download node and MySql from the following links:

      https://nodejs.org/en/download/

     Download either the 64 bit .msi installer or the 32 bit msi installer for Windows, or download the 64 bit .pkg
     for Mac.

      https://www.mysql.com/downloads/

     Download a version of MySQL that works on your system

2. Open the MySql Workbench and create a new connection with the following settings:

    Connection Name: KennUWare
    Hostname: localhost
    Port: 3306
    Username: root
    Password: test

3. Open the .sql files found in silo folders and run them in a new query tab in the MySQL Workbench
   This will create and fill the databases with sample data. The .sql files are named as follows:

   manufacturing_database.sql

   hr_database.sql

4. Install node by following the prompts the application provides.  Ensure that node is added to your path if using
   Windows.

5. Open a CMD window on Windows, or a terminal window on Mac.

6. In the terminal, cd to the top level directory of a SPECIFIC SILO.  For example, if this project is located at:

      C:\Users\Myself\Downloads\KennUWare_Manufacturing

   then execute the command:

      cd C:\Users\Myself\Downloads\KennUWare_Manufacturing

7. Once in the directory, execute the command:

      npm install

8. Then run the command:

      node app.js

9. Once the server has started, it will display the following in the terminal or CMD window:

      Node server running @ http://localhost:3000

   The server is now running the silo you chose.  In a web browser navigate to:

      http://localhost:3000


**************** LOGGING IN ****************
To start using the application the following information can be used.  For manufacturing, login as:

      Username: ManufacturingManager
      Password  manager

      or

      Username: ManufacturingGrunt
      Password: test

   To login to human resources, use the following information:

      Username: HRManager
      Password: manager

      or

      Username: HRRep
      Password: test

**************** KNOWN BUGS/MISSING FUNCTIONALITY *****************

	-

