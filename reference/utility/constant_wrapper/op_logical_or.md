# operator||
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <constexpr-param L, constexpr-param R>
  friend constexpr auto operator||(L x, R y) noexcept;
}
```

## 概要
2つの`constant_wrapper`が保持する値の論理和をとる。

## 戻り値
`constant_wrapper<(L::value || R::value)>{}`を返す。

## 備考
- このオーバーロードは、オペランドのいずれかの値の型が`bool`に変換できない (`!is_constructible_v<bool, ...>`) 場合にのみ使用される。
- 両方の値が`bool`に変換できる場合は、このオーバーロードは使用されず、変換演算子をとおして組み込みの`&&`／`||`（短絡評価）が適用される。
- *Hidden friends*として定義される。

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
