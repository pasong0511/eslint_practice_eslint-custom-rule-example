// enforce-foo-bar.test.js
const { RuleTester } = require("eslint"); //테스트 도구 RuleTester 클래스 사용
const fooBarRule = require("./enforce-foo-bar"); //검사할 파일 import

const ruleTester = new RuleTester({
  // 'const' 변수가 도입된 시점인 2015년 이상의 ecmaVersion을 사용해야 합니다.
  parserOptions: { ecmaVersion: 2015 },
});

// ruleTester.run() 내의 테스트가 통과하지 않으면 에러
ruleTester.run(
  "enforce-foo-bar", // 룰 이름
  fooBarRule, // 룰 코드
  {
    // 검사 항목들
    // 'valid'는 통과해야 할 케이스를 검사
    valid: [
      {
        code: "const foo = 'bar';", // 이 코드는 'foo'가 'bar'에 할당된 유효한 경우
      },
    ],
    // 'invalid'는 통과하지 말아야 할 케이스를 검사
    invalid: [
      {
        code: "const foo = 'baz';", // 이 코드는 'foo'에 'bar'가 아닌 다른 값이 할당된 무효한 경우
        output: 'const foo = "bar";', // 테스트가 수정될 경우 예상되는 출력
        errors: 1, // 발생해야 할 에러의 수
      },
    ],
  }
);

console.log("유후~~ 모두 통과~~🎉🎉🎉🎉"); // 모든 테스트가 통과되면 콘솔에 이 메시지를 출력합니다.
