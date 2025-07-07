# common_type
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class T1, class T2, class U1, class U2>
    requires requires { typename pair<common_type_t<T1, U1>, common_type_t<T2, U2>>; }
  struct common_type<pair<T1, T2>, pair<U1, U2>> {
    using type = pair<common_type_t<T1, U1>, common_type_t<T2, U2>>;
  };
}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要
[`pair`](../pair.md)について、どちらからも変換可能な共通の型を取得できるようにする[`common_type`](/reference/type_traits/common_type.md)の特殊化である。


## 効果
[`pair`](../pair.md)`<`[`common_type_t`](/reference/type_traits/common_type.md)`<T1, U1>,` [`common_type_t`](/reference/type_traits/common_type.md)`<T2, U2>>`によって得られた型をメンバ型`type`として定義する。


## 備考
- [`pair`](../pair.md)`<`[`common_type_t`](/reference/type_traits/common_type.md)`<T1, U1>,` [`common_type_t`](/reference/type_traits/common_type.md)`<T2, U2>>`が型を表すこと。


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
- [P2321R2 `zip`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
