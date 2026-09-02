# operator value_type
* utility[meta header]
* std[meta namespace]
* constant_wrapper[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr operator decltype(value)() const noexcept;
```

## 概要
保持する値`value`への暗黙の変換をおこなう。これにより、`constant_wrapper`を通常の値として扱える。

変換先の型`decltype(value)`は、メンバ変数[`value`](../constant_wrapper.md)の型である。包んでいる値`X`がクラス型であれば`const value_type&`、スカラー型であれば`const value_type`となる。

## 戻り値
`value`を返す。

## 例
```cpp example
#include <utility>

int main()
{
  // 変換演算子により、constant_wrapperを通常の値として使用できる
  int n = std::cw<42>;
  static_assert(std::cw<42> == 42);
}
```

### 出力
```

```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::constant_wrapper`](../constant_wrapper.md)


## 参照
- [P2781R9 `std::constant_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2781r9.html)
- [P3978R3 `constant_wrapper` should unwrap on call and subscript](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3978r3.pdf)
- [P4206R0 Revert string support in `std::constant_wrapper`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4206r0.html)
    - `value`の定義が変更されたことにともない、変換先の型が、包んでいる値がスカラー型である場合に参照ではなく値となった。仕様としてはC++29に導入されるが、C++26に対する欠陥報告 (DR) である
- [LWG Issue 4468. `operator decltype(auto)` is ill-formed](https://cplusplus.github.io/LWG/issue4468)
    - この変換演算子はP2781R9では`operator decltype(auto)()`と宣言されていたが、CWG 1670により変換関数の型指定子として`decltype(auto)`を書くことは不適格であるため、`operator decltype(value)()`へ修正された（変換先の型は変わらない構文上の修正）
