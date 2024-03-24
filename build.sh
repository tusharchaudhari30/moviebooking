rm -r src/main/resources/static/*
cd frontend/moviebookingfrontend
echo "Running npm install"
npm install
echo "Running build"
npm run build
echo "Build successfully"
cd ..
cd ..
echo "Making copying files"
cp -r frontend/moviebookingfrontend/build/static src/main/resources/static/
cp frontend/moviebookingfrontend/build/index.html src/main/resources/templates/index.html
echo "Files copied successfully"
echo "building maven"
./mvnw clean install

