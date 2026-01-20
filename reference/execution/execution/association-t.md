# association-t
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]
* [meta exposition-only]

```cpp
template <class Scope>
struct association-t;
```

## 概要
`association-t`は、実行制御ライブラリの仕様定義で用いられる説明専用のクラステンプレートである。

`association-t`の特殊化は[`scope_association`](scope_association.md)のモデルであり、`Scope*`型の説明専用メンバ`scope`を含む。クラス型`Scope`と`association-t<Scope>`型のオブジェクト`assoc`に対して、

- `assoc.scope`は[関連スコープ](scope_association.md)を指す。
- `assoc.scope != nullptr`のとき、`assoc`は有効(engaged)である。
- `assoc`が有効(engaged)ならば、`assoc.try_associate()`は`assoc.scope->try-associate()`と等価である。
- `assoc`により所有される関連は、`assoc.scope->disassociate()`呼び出しによって解放される。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::scope_association`](scope_association.md)
- [`execution::simple_counting_scope`](simple_counting_scope.md)
- [`execution::counting_scope`](simple_counting_scope.md)


## 参照
- [P3815R1 Add `scope_association` concept to P3149](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3815r1.html)
