# constexpr関数内でのstatic constexpr変数を許可
* cpp23[meta cpp]

## 概要
C++23からは、`constexpr`関数内で定数を定義するために、`static constexpr`変数を使用できるようになる。

```cpp
char xdigit(int n) {
  static constexpr char digits[] = "0123456789abcdef"; // C++20:OK, C++23:OK
  return digits[n];
}

constexpr char xdigit(int n) {
  static constexpr char digits[] = "0123456789abcdef"; // C++20:NG, C++23:OK
  return digits[n];
}
```

C++20までは`constexpr`内で`static constexpr`変数を定義できなかったため、関数外での`static constexpr`変数の定義や、`consteval`関数で定数を返すなどの回避策がとられていたが、C++23からはそのような回避策が必要なくなる。


## 関連項目
- [C++23 定数式内での非リテラル変数、静的変数・スレッドローカル変数およびgotoとラベルの存在を許可する](/lang/cpp23/non_literal_variables_in_constexpr_functions.md)

## 参照
- [P2647R1 Permitting `static constexpr` variables in `constexpr` functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2647r1.html)
