# reference_constructs_from_temporary
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool reference_constructs_from_temporary(info type_dst, info type_src);
}
```
* info[link info.md]

## 概要
参照が一時オブジェクトから構築されるかを判定する。[`std::reference_constructs_from_temporary`](/reference/type_traits/reference_constructs_from_temporary.md)に対応する。


## 戻り値
`type_dst`の参照が`type_src`からの一時オブジェクトに束縛される場合に`true`を返す。


## 例外
`type_dst`または`type_src`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <string>

int main() {
  static_assert(std::meta::reference_constructs_from_temporary(
    ^^const std::string&, ^^const char*));
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


## 関連項目
- [`std::reference_constructs_from_temporary`](/reference/type_traits/reference_constructs_from_temporary.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
