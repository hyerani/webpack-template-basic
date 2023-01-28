// node js 환경에서 동작
const path = require("path"); // path는 node js애서 기본적으로 제공하는 전역 모듈
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정 보통  js파일
  entry: "./js/main.js",

  // 결과물(번들)을 반환하는 설정
  // dist폴더 안에 main.js 파일이 생성됨
  // path, filename 옵션은 기본으로 설정되어있기 때문에 따로 설정을 안해줘도 동작함
  output: {
    // path: path.resolve(__dirname, "dist"), // dirname은 node js 전역변수
    // filename: "main.js",
    clean: true, // 전에 만들어져 있던 파일을 지우고 새로운 파일만 저장
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, // 정규표현식으로 css로 끝나는 모든 파일을 매칭
        use: [
          // 작성 순서 중요! 맨 아래부터 실행됨
          "style-loader", // html에 적용시켜주는 역할
          "css-loader", // css 스타일을 읽는 역할
          "postcss-loader",
          "sass-loader", // scss 스타일을 읽는 역할
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: "index.html", // html파일과 js파일의 합본을 dist폴더에 만들어주는 역할
    }),
    new CopyPlugin({
      patterns: [
        { from: "static" }, // static폴더가 dist폴더로 복사되어 들어감
      ],
    }),
  ],

  devServer: {
    host: "localhost",
  },
};
