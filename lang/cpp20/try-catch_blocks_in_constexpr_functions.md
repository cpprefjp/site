# constexpr関数内でのtry-catchブロックを許可 [P1002R1]
* cpp20[meta cpp]

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


## 関連項目
- [C++20 可変サイズをもつコンテナの`constexpr`化](more_constexpr_containers.md)


## 参照
- [P1002R1 Try-catch blocks in constexpr functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1002r1.pdf)
