# ラムダ式で()を省略できる条件を緩和
* cpp23[meta cpp]

## 概要
C++23では、ラムダ式のパラメータリストが空であれば、以下の要素を含む場合であってもパラメータリストの `()` を省略できる。

- `constexpr`
- `mutable`
- `consteval`
- `noexcept`
- 属性 (C++23時点でここに指定できる標準属性なし)
- 後置戻り値型
- `requires`

```cpp
auto f1 = [b = std::move(a)] () { … }; // C++20 OK, C++23 OK
auto f2 = [b = std::move(a)] { … };    // C++20 OK, C++23 OK

auto f3 = [b = std::move(a)] () mutable { … }; // C++20 OK, C++23 OK
auto f4 = [b = std::move(a)] mutable { … };    // C++20 NG, C++23 OK

auto f5 = [] constexpr mutable noexcept -> bool { return true; }; // C++23 OK
```


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)


## 参照
- [P1102R2 Down with `()`!](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1102r2.html)
