# reflect_object
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <class T>
  consteval info reflect_object(T& object);
}
```
* info[link info.md]

## 概要
オブジェクトからリフレクションを生成する。


## 戻り値
`object`を表すリフレクションを返す。


## 例
```cpp example
#include <meta>

static constexpr int value = 100;

int main() {
  constexpr auto r = std::meta::reflect_object(value);
  static_assert(std::meta::is_object(r));
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
- [`reflect_constant`](reflect_constant.md)
- [`reflect_function`](reflect_function.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
