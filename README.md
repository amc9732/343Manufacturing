# 343Manufacturing
Repository for SWEN 343 HR and Manufacturing Group

## Installation
1) Clone the above repository.
```
git clone https://github.com/amc9732/343Manufacturing.git
```

2) Navigate to the project repository and install the dependencies.
```
cd 343Manufacturing
npm install
```

3) Run `node app.js` to start the application

4) Point your browser to `http://localhost:3000` and you should have the app running.

## Start working on new Feature or Bug-fix
1) Start on up to date "master" branch
```
git checkout master
git pull origin master
```

2) Create new branch off of master branch
```
git checkout -b myExampleBranch
```

3) Keep your branch updated with your changes you make to the code
```
git add . (this adds any new files you've made to the commit)
git commit -m This is an example commit message
git push origin myExampleBranch
```

### When you finish work on your branch, or want to update Master with the work you have done:
```
git checkout master
git pull origin master
git merge myExampleBranch
git push origin master
```
*Let teammates know you merged into Master, and have them follow the next step

### Whenever somebody else merges into Master:
```
git fetch origin
git rebase origin/master
```

### If you run into merge conflicts:
Most IDEs have a merge conflict GUI tools you can use.
You can also use ```git mergetool -y``` from terminal/cmd
