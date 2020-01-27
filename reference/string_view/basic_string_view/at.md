# at
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_reference at(size_type pos) const;
```

## 概要
任意の位置の文�を取得する。


## 戻り値
```
return data()[pos];
```
* data()[link data.md]


## 例外
`pos >=` [`size()`](size.md)の場合、[`std::out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  std::string_view sv = "Hello World";

  char c = sv.at(6);
  assert(c == 'W');
}
```
* at[color ff0000]

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
