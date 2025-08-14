# constexpr関数内でのtry-catchブロックを許可 [P1002R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20では、`constexpr`関数内でのtry-catchブロックの使用を許可する。ただし、`throw`式は従来通り許可せず、コンパイルエラーとなる (`throw`式は`constexpr`関数におけるアサーションのような役割)。

```cpp
constexpr int f(int x) {
  // C++17まではconstexpr関数内でtry/catchブロックを使用するとコンパイルエラー
  try {
    return x + 1;
  }
  catch (...) {
    return 0;
  }
}
```


## この機能が必要になった背景・経緯
この機能が必要になったのは、リフレクションとメタプログラミングのためである。コンパイル時定数として[`std::vector`](/reference/vector/vector.md)を使用できるようにするためには、try-catchブロックを許可することが必要であった。libc++での[`vector::insert()`](/reference/vector/vector/insert.md)の実装において、try-catchブロックを使用して強い例外安全性の保証を提供している。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `constexpr`](/lang/cpp11/constexpr.md)
- [C++20 可変サイズをもつコンテナの`constexpr`化](more_constexpr_containers.md)


## 参照
- [P1002R1 Try-catch blocks in constexpr functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1002r1.pdf)
