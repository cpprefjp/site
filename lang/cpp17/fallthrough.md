# [[fallthrough]]属性
* cpp17[meta cpp]

## 概要

`[[fallthrough]]`属性は意図したフォールスルーであることをコンパイラに伝え、警告を抑制するための属性である。

switch-case文において意図しないフォールスルーによってバグが発生することを防止するため、コンパイラはコンパイル時にフォールスルーを検出して警告を出力する場合がある。

プログラマが意図してフォールスルーを行う場合、コンパイラの警告は無用である。しかし従来はコンパイラごとに警告を抑制する方法が異なり、標準的な方法は無かった。C++17では`[[fallthrough]]`属性により意図したフォールスルーであることをコンパイラに伝え、警告を抑制することができる。

## 仕様

`[[fallthrough]]`属性はフォールスルーしたい各`case`の最後の式に記述する。ただし最後の`case`/`default`に記述するとコンパイルエラーとなる。

## 例
```cpp
#include <iostream>

int main() {
  int n = 3;
  switch (n) {
  case 1:
  case 2: //caseの間に1つも文がなければフォールスルーは警告されない
    std::cout << "case 2\n";
    [[fallthrough]];
  case 3: //[[fallthrough]]属性の記述によりフォールスルー警告は無効化される
    std::cout << "case 3\n";
  case 4: //コンパイラがフォールスルーを警告する
    std::cout << "case 4\n";
    //[[fallthrough]]; //最後のcaseには記述できない、コンパイルエラーになる
  }
}
```

### 出力
```
case 3
case 4
```

### 警告例
g++ 7.1.0、`-Wextra` オプションでコンパイルした場合:
```
fallthrough.cpp: In function ‘int main()’:
fallthrough.cpp:11:15: warning: this statement may fall through [-Wimplicit-fallthrough=]
     std::cout << "case 3\n";
     ~~~~~~~~~~^~~~~~~~~~~~~
fallthrough.cpp:12:3: note: here
   case 4: //コンパイラがフォールスルーを警告する
   ^~~~
```

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)

## 参照
- [P0068R0 Proposal of &#91;&#91;unused&#93;&#93;, &#91;&#91;nodiscard&#93;&#93; and &#91;&#91;fallthrough&#93;&#93; attributes.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0068r0.pdf)
- [P0188R1 Wording for [[fallthrough]] attribute.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0188r1.pdf)
