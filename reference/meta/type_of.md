# type_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info type_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションが表すエンティティの型のリフレクションを取得する。


## 戻り値
`r`が表す値、オブジェクト、変数、関数、非静的データメンバ、ビットフィールド、列挙子、基底クラス関係、データメンバ仕様、または関数パラメータの型のリフレクションを返す。



## 例外
`r`が型を持つエンティティを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。

## 例
```cpp example
#include <meta>

int x = 42;

int main() {
  static_assert(std::meta::type_of(^^x) == ^^int);
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
