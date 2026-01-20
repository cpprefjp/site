# scope_association
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template <class Assoc>
  concept scope_association =
    movable<Assoc> &&
    is_nothrow_move_constructible_v<Assoc> &&
    is_nothrow_move_assignable_v<Assoc> &&
    default_initializable<Assoc> &&
    requires(const Assoc assoc) {
      { static_cast<bool>(assoc) } noexcept;
      { assoc.try_associate() } -> same_as<Assoc>;
    };
}
```
* movable[link /reference/concepts/movable.md]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* is_nothrow_move_assignable_v[link /reference/type_traits/is_nothrow_move_assignable.md]

## 概要
`scope_association`コンセプトは、型`Assoc`に対する要件を定義する。関連スコープ(associated scope)と呼ばれる非同期スコープとの関連付けを所有するときに限って、`Assoc`型のオブジェクトは有効(engaged)である。


## モデル
型`Assoc`は、次のとき`scope_association`のモデルとなる。

- デフォルト構築された`Assoc`型オブジェクトは有効でない(not engaged)。
- `Assoc`型のオブジェクト`assoc`に対して、`static_cast<bool>(assoc)`が`true`のときに限って`assoc`は有効(engaged)である。
- 同一の関連付けを所有する`Assoc`型の2つのオブジェクトは存在しない。
- `Assoc`型のオブジェクト`assoc`に対して、`assoc`の破棄は（もしあれば）`assoc`により所有される関連付けを解放する。
- `Assoc`型のオブジェクト`assoc`に対して、ムーブ構築のソースオペランドとして使われた後、`assoc`は有効でない(not engaged)。
- `Assoc`型の異なるオブジェクト`assoc1`と`assoc2`に対して、`assoc1 = std::move(assoc2)`を評価した後、（もしあれば）`assoc1`により所有される関連付けは解放され、`assoc2`は有効でない(not engaged)。
- `Assoc`型の有効な(engaged)オブジェクト`assoc`に対して、`assoc.try_associate()`は有効でない(not engaged)オブジェクト、もしくは`assoc`の関連スコープとの新しい関連付けを取得して関連付けを所有する有効な(engaged)オブジェクトのいずれかを返す。
- `Assoc`型の有効でない(not engaged)オブジェクト`assoc`に対して、`assoc.try_associate()`は有効でない(not engaged)オブジェクトを返す。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scope_token`](scope_token.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
- [P3815R1 Add `scope_association` concept to P3149](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3815r1.html)
