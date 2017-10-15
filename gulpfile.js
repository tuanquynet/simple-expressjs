/* © 2017 NauStud.io
 * @author Quy Tran
 */

console.time('Gulp init time');
const path = require('path');
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
/* eslint-disable import/no-unresolved */
const runSequence = require('run-sequence');

const packageJSON = require('./package.json');

console.timeEnd('Gulp init time');
const appName = 'simpleapp';
const awsConfig = {
    profile: 'quytran',
    ecrRepoId: '463464984597'
};

gulp.task('run-app-in-container', [], (done) => {
    const imageName = `${appName}-${process.env.NODE_ENV || 'testing'}`;
    const imageTag = packageJSON.version;
    const SERVER_PORT = 8080;
    const tasks = [
        `docker run -d -e "APP_NAME=demo01" -e "SERVER_PORT=${SERVER_PORT}" --name ${imageName} -p ${SERVER_PORT}:${SERVER_PORT} ${imageName}:${imageTag}`
    ];
    return g.shell.task(tasks)(done);
});

gulp.task('aws-get-login', [], (done) => {
    console.log('aws-get-login');
    const tasks = [
        `aws ecr get-login --no-include-email --region ap-southeast-1 --profile ${awsConfig.profile}`
    ];
    return g.shell.task(tasks)(done);
});

gulp.task('build-app-image', ['generate-app-image'], () => {
    console.log('build-app-image');
    return gulp.start('tag-app-image');
});

gulp.task('remove-current-app-image', (done) => {
    console.log('remove-current-app-image');
    const imageTag = packageJSON.version;
    const imageName = `simpleapp-${process.env.NODE_ENV || 'testing'}`;
    const remoteImageName = `${awsConfig.ecrRepoId}.dkr.ecr.ap-southeast-1.amazonaws.com/${imageName}:${imageTag}`;
    const tasks = [
        `docker stop ${imageName}`,
        `docker rm ${imageName}:${imageTag}`,
        `docker rmi ${remoteImageName}`,
    ];
    return g.shell.task(tasks)(done);
});

gulp.task('generate-app-image', (done) => {
    console.log('generate-app-image');
    const imageTag = packageJSON.version;
    const imageName = `simpleapp-${process.env.NODE_ENV || 'testing'}`;
    const tasks = [
        `docker build . -t ${imageName}:${imageTag}`,
    ];
    return g.shell.task(tasks)(done);
});

gulp.task('tag-app-image', [], (done) => {
    console.log('tag-app-image');
    const imageTag = packageJSON.version;
    const imageName = `simpleapp-${process.env.NODE_ENV || 'testing'}`;
    const remoteImageName = `${awsConfig.ecrRepoId}.dkr.ecr.ap-southeast-1.amazonaws.com/${imageName}:${imageTag}`;
    const tasks = [
        `docker tag ${imageName}:${imageTag} ${remoteImageName}`,
    ];
    return g.shell.task(tasks)(done);
});

gulp.task('push-app-image', [], (done) => {
    console.log('push-app-image onto server');
    // You need to make sure you have login
    const imageTag = packageJSON.version;
    const imageName = `simpleapp-${process.env.NODE_ENV || 'testing'}`;
    const remoteImageName = `${awsConfig.ecrRepoId}.dkr.ecr.ap-southeast-1.amazonaws.com/${imageName}:${imageTag}`;
    const tasks = [
        `docker push ${remoteImageName}`,
    ];
    return g.shell.task(tasks)(done);
});
