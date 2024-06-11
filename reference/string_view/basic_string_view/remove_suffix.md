# remove_suffix
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr void remove_suffix(size_type n);
```

## 概要
末尾のN文字を削除する。


## 要件
- `n <=` [`size()`](size.md)であること


## 効果
メンバ変数として、参照する文字配列の文字数`size_type size_`があるものとして、以下と等価：

```cpp
size_ -= n;
```


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv = "This is a pen";

  sv.remove_suffix(4); // 末尾4文字 " pen" を削除
  std::cout << '[' << sv << ']' << std::endl;
}
```
* remove_suffix[color ff0000]

### 出力
```
[This is a]
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
