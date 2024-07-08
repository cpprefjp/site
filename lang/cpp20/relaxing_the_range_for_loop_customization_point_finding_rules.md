# 範囲for文がカスタマイゼーションポイントを見つけるルールを緩和 [P0962R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
C++17までは、範囲for文に指定するシーケンスの型が`begin`/`end`メンバのどちらかでも持っていれば`begin()`/`end()`メンバ関数を使用し、どちらも持っていなければADLで非メンバ関数の`begin()`/`end()`を探索する仕様となっていた。

C++20ではこのルールを緩和し、`begin`/`end`メンバの両方があるときに限り`begin()`/`end()`メンバ関数を使用し、どちらかが不足していれば非メンバ関数の`begin()`/`end()`を探しにいくよう改定する。

これは、`begin`もしくは`end`という何らかのメンバ (関数、変数、型) が特殊な意味を持ち、そのメンバが範囲for文で使用することを意図していないような状況に対応するための改訂である。

なお、この修正はC++11へ遡って適用された。そのため、この修正を実装した処理系では、以下のコンパイルエラーを試すことはできない。

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

  // P0962R1非対応の場合はコンパイルエラー
  // (std::stringstream::endメンバだけが見つかり、対応するbeginがないというエラーになる)。
  // P0962R1に対応していればOK
  for (char c : x) {
    std::cout << c << std::endl;
  }
}
```
* std::istream_iterator[link /reference/iterator/istream_iterator.md]

### 出力
```
H
e
l
l
o
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 範囲for文](/lang/cpp11/range_based_for.md)
- [C++17 範囲forの制限緩和 — `begin` と `end` の型が異なることを許可](/lang/cpp17/generalizing_the_range-based_for_loop.md)


## 参照
- [P0962R1 Relaxing the range-for loop customization point finding rules](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0962r1.html)