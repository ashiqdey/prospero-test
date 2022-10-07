### Prospero test

# URL

Porject is deployed at [prospero.grocered.online](https://prospero.grocered.online)

# Time taken

## Backend

| Feature                      | Time   |
| ---------------------------- | ------ |
| Setting up project           | 30 min |
| Creation of model            | 15 min |
| Mongo cluster creation       | 15 min |
| Search , Sort, Pagination    | 2 Hr   |
| Adding student API           | 30 min |
| validations                  | 30 min |
| Testing of API               | 30 min |
| Configuration for deployment | 30 min |
| Deployment                   | 15 min |

## Frontend

| Feature                 | Time   |
| ----------------------- | ------ |
| Setting up project      | 10 min |
| Creation of basic UI    | 30 min |
| Search, Sort,Pagination | 2 Hr   |
| Handiling API Call      | 15 min |
| Integration of API      | 30 min |
| Addition of Cache       | 30 min |
| Addition of context     | 30 min |
| Linting and refactoring | 1 Hr   |
| Deployment setup        | 15 min |
| Subsequent Deployment   | 0 min  |

## Bugs fixed

| Status | Feature                                                                                                                                                   |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OK     | only type number it is only searching for id. eg: there is email names as student2@something and also name as 3, so typing 3 is not giving anything.      |
| OK     | Search functionality is wrong, if you add @ in the name, it won’t search with that name                                                                   |
| OK     | search is on click rather than on change or debounce.                                                                                                     |
| OK     | after typing 3 and searching if I try to type nothing (empty) and search it gives 400.                                                                    |
| OK     | Student id is not autogenerating, you have to give it manually.                                                                                           |
| OK     | 1st page result is saved. So if you search anything, then make the search box empty and press enter (from any page, let's say 4). It's sending me default |
| OK     | No sort on emails                                                                                                                                         |
| OK     | No search on subjects                                                                                                                                     |
| OK     | In case of error, the page is just loading, instead of showing any error                                                                                  |
| OK     | If the wrong search is made, the app crashes.                                                                                                             |
