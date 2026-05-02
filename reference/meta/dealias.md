# dealias
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info dealias(info r);
}
```
* info[link info.md]

## 概要
エイリアスを解決して元のエンティティのリフレクションを取得する。


## 戻り値
`r`が型エイリアスまたは名前空間エイリアスを表す場合、エイリアス先のリフレクションを返す。エイリアスでなければ`r`をそのまま返す。


## 例外
`r`がエンティティを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

using MyInt = int;

int main() {
  static_assert(^^MyInt != ^^int);                     // 型の別名は区別される
  static_assert(std::meta::dealias(^^MyInt) == ^^int); // dealias()で元の型を取得
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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
