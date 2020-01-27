# length
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr size_type length() const noexcept;
```

## 概要
文�列の長さを取得する。


## 戻り値
保持している文�列の長さを返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv1{"Hello World"};
  std::string_view sv2 = sv1.substr(0, 5);

  assert(sv1.length() == 11);
  assert(sv2.length() == 5);

  std::cout << '[' << sv1 << ']' << std::endl;
  std::cout << '[' << sv2 << ']' << std::endl;
}
```
* length()[color ff0000]
* sv1.substr[link substr.md]

### 出力
```
[Hello World]
[Hello]
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
