# empty
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr bool empty() const noexcept;
```

## 概要
文字列が空かどうかを判定する。


## 戻り値
```cpp
return size() == 0;
```
* size()[link size.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  std::string_view sv1;
  std::string_view sv2 = "Hello";

  assert(sv1.empty());
  assert(!sv2.empty());
}
```
* empty()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0
- [GCC, C++17 mode](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
