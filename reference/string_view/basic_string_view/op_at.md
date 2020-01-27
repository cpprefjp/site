# operator[]
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_reference operator[](size_type pos) const;
```

## 概要
任意の位置の文�を取得する。


## 要件
- `pos <` [`size()`](size.md)


## 戻り値
```
return data()[pos];
```
* data()[link data.md]


## 例外
投げない


## 備考
[`std::basic_string`](/reference/string/basic_string.md)`::`[`operator[]`](/reference/string/basic_string/op_at.md)は`s[s.size()]`で`CharT()`を返すが、`std::basic_string_view`クラスのこの演算�では未定義動作となる


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  std::string_view sv = "Hello World";

  char c = sv[6];
  assert(c == 'W');
}
```
* sv[6][color ff0000]

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
