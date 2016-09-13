## Data Triangulation Tool

### Goal:

Allows users to fetch data from different sources and check for data discrepancies

### How to run:

To run the app in development:

* Copy connection.yml.example to connection.yml and edit the credentials accordingly
* ```./run```
* Go to localhost:3000

### Features:
* Create new query / edit existing queries
* Filter data and compare using transformation. See Transformation section in Form Descriptions.
* Remove existing queries.
* Clear all values in the form.

### Form Descriptions:

* Name : Name of the new file. The input will be saved as id. Changing the name of an existing query will be saved as a new file.
* Initial Data: Initial variables, acts as parameters. See ```example-initial-data.json```
* Query Form:
  * Name: The result of this query will be saved under this name
  * Description (optional): A brief description of what the query does
  * Database: Specify which database in which the query runs
  * Query field: Key in the query
* Transformation:
  * Allows user to transform previous data into a new format. See ```example-query-with-transformation```
  * Name: The result of this transformation will be saved under this name
  * Transform:
      Example: ```$ids|join:,|upcase```

### TODO:
* Display more user-friendly error messages
* Generate sum/average of data
