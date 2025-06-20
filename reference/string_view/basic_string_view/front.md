# front
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_reference front() const;
```

## 概要
先頭文字を取得する。


## 要件
- `!`[`empty()`](empty.md)


## 戻り値
```cpp
return data()[0];
```
* data()[link data.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  std::string_view sv = "Hello World";

  char c = sv.front();
  assert(c == 'H');
}
```
* front()[color ff0000]

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
