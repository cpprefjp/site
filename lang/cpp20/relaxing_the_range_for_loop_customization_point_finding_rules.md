# 範囲for文がカスタマイゼーションポイントを見つけるルールを緩和
* cpp20[meta cpp]

## 概要
C++17までは、範囲for文に指定するシーケンスの型が`begin()`／`end()`メンバ関数のどちらかでも持っていればそれを使用し、どちらも持っていなければADLで非メンバ関数の`begin()`／`end()`を探索する仕様となっていた。

C++20ではこのルールを緩和し、`begin()`/`end()`メンバ関数の両方があればそれを使用し、どちらかが不足していれば非メンバ関数の`begin()`/`end()`を探しにいくよう改定する。

これは、`begin`もしくは`end`という何らかのメンバ (関数、変数、型) が特殊な意味を持ち、そのメンバが範囲for文で使用することを意図していないような状況に対応するための改訂である。


## 例
```cpp example
#include <sstream>
#include <iterator>

struct X : std::stringstream {
  X(const char* s)
    : std::stringstream(s) {}
};

std::istream_iterator<char> begin(X& x)
{
  return std::istream_iterator<char>(x);
}

std::istream_iterator<char> end(X&)
{
  return std::istream_iterator<char>();
}

#include <iostream>
int main()
{
  X x{"Hello"};

  // C++17まではコンパイルエラー
  // (std::stringstream::endメンバだけが見つかり、対応するbeginがないというエラーになる)。
  // C++20ではOK
  for (char c : x) {
    std::cout << c << std::endl;
  }
}
```

### 出力
```
H
e
l
l
o
```


## 関連項目
- [C++11 範囲for文](/lang/cpp11/range_base_for.md)
- [C++17 範囲forの制限緩和 — `begin` と `end` の型が異なることを許可](/lang/cpp17/generalizing_the_range-based_for_loop.md)


## 参照
- [P0962R1 Relaxing the range-for loop customization point finding rules](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0962r1.html)
