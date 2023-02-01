# basic_common_reference
* tuple[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
template<tuple-like TTuple, tuple-like UTuple,
    template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<TTuple, UTuple, TQual, UQual>;
}
```
* basic_common_reference[link /reference/type_traits/basic_common_reference.md]
* tuple-like[link ../tuple-like.md]

## 概要
[`tuple`](../tuple.md)と[`tuple-like`](../tuple-like.md)なオブジェクについて、[`common_reference`](/reference/type_traits/common_reference.md)で共通の参照型を取得できるようにアダプトする[`basic_common_reference`](/reference/type_traits/common_reference.md)の特殊化である。

ユーザーが直接この特殊化を利用する必要はない。[`common_reference`](/reference/type_traits/common_reference.md)を使用すること。


## 効果
[`tuple`](../tuple.md)`<`[`common_reference_t`](/reference/type_traits/common_reference.md)`<TQual<TTypes>, UQual<UTypes>>...>`によって得られた型をメンバ型`type`として定義する。


## 要件
- `TTuple`か`UTuple`のどちらかが[`tuple`](../tuple.md)の特殊化であること。
- `TTuple`と`UTuple`のそれぞれについて、（次の`T`を置き換える形で）[`is_same_v`](/reference/type_traits/is_same.md)`<T, `[`decay_t`](/reference/type_traits/decay.md)`<T>>`であること。
    - 実質的には`TTuple`と`Utuple`について、参照型ではなく、最上位の`const`/`volatile`修飾も持っていないこと要求する。
- `TTuple`と`UTuple`の要素数が一致していること。
    - 具体的には、[`tuple_size_v`](../tuple_size.md)`<TTuple> ==` [`tuple_size_v`](../tuple_size.md)`<UTuple>`であること。
- [`tuple`](../tuple.md)`<`[`common_reference_t`](/reference/type_traits/common_reference.md)`<TQual<TTypes>, UQual<UTypes>>...>`が正しく型を表すこと。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ???
- [GCC](/implementation.md#gcc): ???
- [ICC](/implementation.md#icc): ???
- [Visual C++](/implementation.md#visual_cpp): ???


## 関連項目
- [`basic_common_reference`](/reference/type_traits/basic_common_reference.md)


## 参照
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
