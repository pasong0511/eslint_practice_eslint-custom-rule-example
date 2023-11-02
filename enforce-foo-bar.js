// enforce-foo-bar.js

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: "code", // 이 룰에 의해 발견된 문제는 코드 수정으로 고칠 수 있음을 의미
    schema: [], // 이 룰에 대한 옵션 스키마가 없다는 것
  },
  create(context) {
    return {
      //add callback function(s)
      VariableDeclarator(node) {
        //const 인지 확인하기
        if (node.parent.kind === "const") {
          //변수 이름이 foo 인지 확인하기
          if (node.id.type === "Identifier" && node.id.name === "foo") {
            if (
              node.init &&
              node.init.type === "Literal" &&
              node.init.value !== "bar"
            ) {
              //eslint에 에러 보고하기
              //에러 메시지는 메시지 플레이스홀더를 사용
              //`fix(fixer)` 함수를 포함하여 `const foo`에 할당된 어떤 값이든 "bar"로 대체
              context.report({
                node,
                //에러 알림
                message:
                  'const foo`에 "bar"가 아닌 값이 할당되었습니다. 예상치 못한 값: {{ notBar }}.',
                data: {
                  notBar: node.init.value,
                },
                //고칠때 쓰는 부분
                fix(fixer) {
                  return fixer.replaceText(node.init, '"bar"');
                },
              });
            }
          }
        }
      },
    };
  },
};
