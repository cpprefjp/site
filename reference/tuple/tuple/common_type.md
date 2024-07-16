# common_type
* tuple[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<tuple-like TTuple, tuple-like UTuple>
  struct common_type<TTuple, UTuple>;
}
```
* common_type[link /reference/type_traits/common_type.md]
* tuple-like[link ../tuple-like.md]

## 概要
[`tuple`](../tuple.md)と[`tuple-like`](../tuple-like.md)なオブジェクについて、どちらからも変換可能な共通の型を取得できるようにする[`common_type`](/reference/type_traits/common_type.md)の特殊化である。


## 効果
[`tuple`](../tuple.md)`<`[`common_type_t`](/reference/type_traits/common_type.md)`<TTypes, UTypes>...>`によって得られた型をメンバ型`type`として定義する。


## 備考
- `TTuple`か`UTuple`のどちらかが[`tuple`](../tuple.md)の特殊化であること。
- `TTuple`と`UTuple`のそれぞれについて、（次の`T`を置き換える形で）[`is_same_v`](/reference/type_traits/is_same.md)`<T,` [`decay_t`](/reference/type_traits/decay.md)`<T>>`であること。
    - 実質的には`TTuple`と`Utuple`について、参照型ではなく、最上位の`const`/`volatile`修飾も持っていないこと要求する。
- `TTuple`と`UTuple`の要素数が一致していること。
    - 具体的には、[`tuple_size_v`](../tuple_size.md)`<TTuple> ==` [`tuple_size_v`](../tuple_size.md)`<UTuple>`であること。
- [`tuple`](../tuple.md)`<`[`common_type_t`](/reference/type_traits/common_type.md)`<TTypes, UTypes>...>`が正しく型を表すこと。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]

## 関連項目
- [common_type](/reference/type_traits/common_type.md)

## 参照
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
