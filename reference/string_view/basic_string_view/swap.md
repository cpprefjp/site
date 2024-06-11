# swap
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr void swap(basic_string_view& s) noexcept;
```

## 概要
他の`basic_string_view`オブジェクトとデータを入れ替える。


## 効果
`this`と`s`が保持しているデータを入れ替える。


## 例外
投げない


## 備考
`basic_string_view`クラスに対して、非メンバ関数版の専用`swap()`は定義されない。そのような用途には、[`<utility>`](/reference/utility.md)ヘッダで定義される汎用版の[`std::swap()`](/reference/utility/swap.md)関数を使用すること。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view a = "AAA";
  std::string_view b = "BBB";

  a.swap(b);

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* swap[color ff0000]

### 出力
```
BBB
AAA
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
