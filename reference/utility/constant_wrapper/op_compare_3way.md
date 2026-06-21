# operator<=>
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <constexpr-param L, constexpr-param R>
friend constexpr auto operator<=>(L x, R y) noexcept;
```

## 概要
2つの`constant_wrapper`が保持する値を三方比較する。

## 戻り値
`constant_wrapper<(L::value <=> R::value)>{}`を返す。

## 備考
- *Hidden friends*として定義されるため、引数依存の名前探索 (ADL) でのみ発見される。
- オペランドのいずれかが`constant_wrapper`でない場合、保持する値へアンラップして通常の演算がおこなわれる。

## 例
```cpp example
#include <utility>

int main()
{
  // 比較結果（順序付け）を保持するconstant_wrapperを返す
  static_assert((std::cw<3> <=> std::cw<5>) < 0);
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
