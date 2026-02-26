# back
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_reference back() const;
```

## 概要
末尾文字を取得する。


## 堅牢化された事前条件
- `!`[`empty()`](empty.md)


## 戻り値
```cpp
return data()[size() - 1];
```
* data()[link data.md]
* size()[link size.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  std::string_view sv = "Hello World";

  char c = sv.back();
  assert(c == 'd');
}
```
* back()[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
