let gulp=require('gulp');
let connect=require('gulp-connect');
let concat=require('gulp-concat');
let babel=require('gulp-babel');
let uglify=require('gulp-uglify');
let rename=require('gulp-rename');
let sass=require('gulp-sass');
let proxy=require('http-proxy-middleware');
gulp.task("t1",()=>{
    console.log("hello gulp");
})

gulp.task("index",()=>{
    gulp.src(["src/**/*","!src/**/*.scss"]).pipe(gulp.dest("dist")).pipe(connect.reload())
})
gulp.task("watch",()=>{
    gulp.watch(["src/*.html","src/js/*.js","src/css/*.css","src/css/*.scss"],["sass","index"])
})
gulp.task("server",()=>{
    connect.server({
        root:"dist",
        port:8080,
        livereload:true,
        middleware:function() {
            return [
                proxy('/api',{
                    target:'http://localhost/app_ctrl',
                    changeOrigin:true,
                    pathRewrite:{
                        '^/api':''
                    }
                })
            ]
        }
    })
})
// gulp.task("es5",()=>{
//     gulp.src(["src/**/*.js"]).pipe(concat("index.js")).pipe(rename("index-min.js")).pipe(uglify()).pipe(gulp.dest("dist"))
//     // .pipe(uglify()).pipe(rename("index-min.js")).pipe(gulp.dest("dest")).pipe(babel()).pipe(rename("index-es5.js")).pipe(gulp.dest("dist"));
// })
// gulp.task("uglify",()=>{
//     gulp.src(['src/index/index.js','src/index/js/1.js']).
//     pipe(concat("all.js")).
//     pipe(gulp.dest("dist")).
//     pipe(babel()).
//     pipe(rename("all-es5.js")).
//     pipe(gulp.dest("dist")).
//     pipe(uglify()).
//     pipe(rename("all-es5-min.js")).
//     pipe(gulp.dest("dist"))
// })


gulp.task("all",["watch","server"])

gulp.task("sass",()=>{
    gulp.src("src/css/*.scss").pipe(sass().on("error",sass.logError)).pipe(gulp.dest("dist/css"));
})