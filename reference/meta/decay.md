# decay
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info decay(info type);
}
```
* info[link info.md]

## 概要
型に対して、配列からポインタ、関数から関数ポインタへの暗黙変換を適用する。[`std::decay`](/reference/type_traits/decay.md)に対応する。


## 戻り値
`type`が表す型に対して[`std::decay`](/reference/type_traits/decay.md)相当の変換を適用した結果の型のリフレクションを返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::decay(^^int[3]) == ^^int*);
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


## 関連項目
- [`std::decay`](/reference/type_traits/decay.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
