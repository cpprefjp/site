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
先頭のN文字を削除する。


## 堅牢化された事前条件
- `n <=` [`size()`](size.md)であること


## 効果
メンバ変数として、参照する文字配列へのポインタを`const CharT* data_`、文字数を`size_type size_`があるものとして、以下と等価：

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

  sv.remove_prefix(5); // 先頭5文字 "This " を削除
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
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
