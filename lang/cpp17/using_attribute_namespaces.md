# 属性の名前空間指定に繰り返しをなくす
* cpp17[meta cpp]

## 概要

複数の属性を指定する際`using`により名前空間を指定できる。

同じ名前空間に属する複数の属性を指定したい場合がある。従来は同じ名前空間を何度も記述しなければならなかったが、`using`で名前空間を指定することで一度で記述できるように変更された。

## 仕様

文法仕様は下記の通り。

```
attribute-specifier:
    [ [ attribute-using-prefix opt attribute-list ] ]
    alignment-specifier

attribute-using-prefix:
    using attribute-namespace :
```

属性の先�部分に`using`、名前空間、コ�ン`:`の順に記述し、その後に続けて属性の名前を記述する。

`using`で名前空間を指定した場合は、続く属性の名前に名前空間は指定できない。`using`で複数の名前空間を指定することもできない。

## 例
```cpp example
[[CC::opt(1)]] [[CC::debug]] void f() {}
  //�しい

[[CC::opt(1), CC::debug]] void g() {}
  //�しい

[[using CC: opt(1), debug]] void h() {}
  //�しい、上記の [[CC::opt(1), CC::debug]] と同じ意味になる

[[using CC: opt(1)]] [[CC::debug]] void i() {}
  //�しい、上記と同じ意味になる

[[using CC: CC::opt(1)]] void j() {}
  //間違い、usingと名前空間の指定は混在できない

int main() {}
```

### 出力
不適格。

### �告例
clang++ 5.0.0 にてコンパイルした場合。

```
using_attribute_namespaces.cpp:13:13: error: attribute with scope specifier cannot follow default scope specifier
[[using CC: CC::opt(1)]] void j() {}
        ~~  ^
1 error generated.
```

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)

## 参照
- [P0028R4 Using attribute namespaces without repetition.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0028r4.html)
