# basic_common_reference
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class T1, class T2, class U1, class U2,
    template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<pair<T1, T2>, pair<U1, U2>, TQual, UQual> {
    using type = pair<common_reference_t<TQual<T1>, UQual<U1>>,
                      common_reference_t<TQual<T2>, UQual<U2>>>;
  };
}
```
* basic_common_reference[link /reference/type_traits/basic_common_reference.md]
* pair[link ../pair.md]
* common_reference_t[link /reference/type_traits/common_reference.md]

## 概要
[`pair`](../pair.md)について、[`common_reference`](/reference/type_traits/common_reference.md)で共通の参照型を取得できるようにアダプトする[`basic_common_reference`](/reference/type_traits/common_reference.md)の特殊化である。

ユーザーが直接この特殊化を利用する必要はない。[`common_reference`](/reference/type_traits/common_reference.md)を使用すること。


## 効果
[`pair`](../pair.md)`<`[`common_reference_t`](/reference/type_traits/common_reference.md)`<TQual<T1>, UQual<U1>>,` [`common_reference_t`](/reference/type_traits/common_reference.md)`<TQual<T2>, UQual<U2>>>`によって得られた型をメンバ型`type`として定義する。


## 要件
- [`pair`](../pair.md)`<`[`common_reference_t`](/reference/type_traits/common_reference.md)`<TQual<T1>, UQual<U1>>,` [`common_reference_t`](/reference/type_traits/common_reference.md)`<TQual<T2>, UQual<U2>>>`が型を表すこと。


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
- [P2321R2 `zip`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
