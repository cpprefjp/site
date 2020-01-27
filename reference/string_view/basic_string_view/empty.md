# empty
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr bool empty() const noexcept;               // C++17
[[nodiscard]] constexpr bool empty() const noexcept; // C++20
```

## 概要
文�列が空かどうかを判定する。


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
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
