# remove_prefix
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr void remove_prefix(size_type n);
```

## 概要
先�のN文�を削除する。


## 要件
- `n <=` [`size()`](size.md)であること


## 効果
メンバ変数として、参照する文�配列へのポインタを`const CharT* data_`、文�数を`size_type size_`があるものとして、以下と�価：

```cpp
data_ += n;
size_ -= n;
```


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv = "This is a pen";

  sv.remove_prefix(5); // 先�5文� "This " を削除
  std::cout << '[' << sv << ']' << std::endl;
}
```
* remove_prefix[color ff0000]

### 出力
```
[is a pen]
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
