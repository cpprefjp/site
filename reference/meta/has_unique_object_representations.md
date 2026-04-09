# has_unique_object_representations
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_unique_object_representations(info type);
}
```
* info[link info.md]

## 概要
型が一意なオブジェクト表現を持つかを判定する。[`std::has_unique_object_representations`](/reference/type_traits/has_unique_object_representations.md)に対応する。


## 戻り値
`type`が表す型が一意なオブジェクト表現を持つ場合に`true`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::has_unique_object_representations(^^int));
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
- [`std::has_unique_object_representations`](/reference/type_traits/has_unique_object_representations.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
