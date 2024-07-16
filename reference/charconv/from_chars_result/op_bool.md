# operator bool
* charconv[meta header]
* std[meta namespace]
* from_chars_result[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr explicit operator bool() const noexcept;
```

## 概要
変換が成功したかを判定する。


## 戻り値
```cpp
return ec == errc{};
```
* errc[link /reference/system_error/errc.md]


## 例
```cpp example
#include <iostream>
#include <charconv>

int main()
{
  const char str[] = "123";
  int value{};
  if (std::from_chars(std::begin(str), std::end(str), value)) {
    std::cout << value << std::endl;
  }
  else {
    std::cout << "conversion failed" << std::endl;
  }
}
```
* std::from_chars[link /reference/charconv/from_chars.md]

### 出力
```
123
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2497R0 Testing for success or failure of `<charconv>` functions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2497r0.html)
