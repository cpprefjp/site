# operator=
* utility[meta header]
* std[meta namespace]
* constant_wrapper[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <constexpr-param R>
constexpr auto operator=(R y) const noexcept;
```

## 概要
`constant_wrapper`が保持する値に、別の`constant_wrapper`が保持する値を代入する。

## 戻り値
`constant_wrapper<(value = R::value)>{}`を返す。

## 備考
- `constant_wrapper`が保持する`value`は`const`であるため、`value = R::value`という代入式は不適格となる。
- したがって、このオーバーロードは宣言されているものの、`constant_wrapper`に対してはオーバーロード解決に参加せず、使用できない。

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
