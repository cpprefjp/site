# 入れ子名前空間定義でのインライン名前空間 [P1094R2]
* cpp20[meta cpp]

## 概要
C++17で、入れ子の名前空間を`namespace ns1::ns2::ns3 {}`のように簡易的に定義できるようになったが、インライン名前空間の指定はできなかった。

C++20では、`namespace ns1::inline ns2::ns3 {}`のように、入れ子名前空間を一度に定義する場合でも一部の名前空間をインラインの指定をできるようにする。

以下の定義は、

```cpp
namespace ns1::inline ns2::ns3 {
  class X;
}
```

以下と等価である：

```cpp
namespace ns1 {
inline namespace ns2 {
namespace ns3 {
  class X;
}}}
```


## 関連項目
- [C++11 インライン名前空間](/lang/cpp11/inline_namespaces.md)
- [C++17 入れ子名前空間の定義](/lang/cpp17/nested_namespace.md)


## 参照
- [P1094R2 Nested Inline Namespaces](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1094r2.html)
