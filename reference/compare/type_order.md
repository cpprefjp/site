# type_order
* compare[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct type_order {
    static constexpr strong_ordering value = TYPE-ORDER(T, U); // 説明専用

    using value_type = strong_ordering;

    constexpr operator value_type() const noexcept { return value; }
    constexpr value_type operator()() const noexcept { return value; }
  };

  template <class T, class U>
  constexpr strong_ordering type_order_v = type_order<T, U>::value;
}
```
* strong_ordering[link strong_ordering.md]

## 概要
2つの型`T`と`U`の間の、コンパイル時の全順序を取得する。

これを使用することにより、型リストの正規化（例えば`typeset<A, B>`と`typeset<B, A>`を同じ型として扱う）や、複数の翻訳単位にわたって型の順序を一貫させることができる。


## 効果
`TYPE-ORDER(T, U)`は実装定義であり、すべての型に対する全順序を表す。以下の保証がある：

- 反射律: `type_order_v<T, T>`は[`strong_ordering::equal`](strong_ordering.md)
- 反対称律: `type_order_v<T, U>`が`less`であれば、`type_order_v<U, T>`は`greater`
- 推移律: 通常の推移性
- CV修飾や参照修飾の異なる型は別個の型として区別される（例: `int`、`const int`、`int&`は順序として`equal`ではない）

実装は、型の同名異シグニチャ化に使用される既存のABIマングリング基盤を利用することが想定される。実装は推奨事項として、テンプレートの第i引数のみが異なる場合に、`X<...,T,...>`と`X<...,U,...>`の順序が`T`と`U`の順序と一致するように再帰的な一貫性を提供することができる。


## 備考
- C++26より前は、型の全順序を得るためには`__PRETTY_FUNCTION__`等の処理系固有の機能を使うか、`typeid`を実行時に比較する必要があった。`type_order`は、コンパイル時に取得できる、実装定義であるが安定した型の全順序を提供する
- このクラスは不完全型に対しても動作する
- 実装定義の全順序の具体的な順番には依存すべきではないが、同じ実装のなかでは翻訳単位の境界をまたいでも安定する


## 例
```cpp example
#include <compare>
#include <type_traits>

struct A {};
struct B {};

int main() {
  // 同じ型同士の比較はequal
  static_assert(std::type_order_v<int, int> == std::strong_ordering::equal);

  // 異なる型同士の順序は実装定義だが、反対称性は保証される
  constexpr auto ord_ab = std::type_order_v<A, B>;
  constexpr auto ord_ba = std::type_order_v<B, A>;
  static_assert(ord_ab != std::strong_ordering::equal);
  static_assert((ord_ab < 0) == (ord_ba > 0));
  static_assert((ord_ab > 0) == (ord_ba < 0));

  // CV修飾の違いも区別される
  static_assert(std::type_order_v<int, const int> != std::strong_ordering::equal);
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`strong_ordering`](strong_ordering.md)
- [`std::meta::type_order`](/reference/meta/type_order.md)


## 参照
- [P2830R10 Constexpr Type Ordering](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2830r10.html)
- [P3778R0 Fix for `type_order` template definition](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3778r0.html)
- [P4140R0 Proposed resolution for US70-126: allow incomplete types in `type_order`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4140r0.html)
