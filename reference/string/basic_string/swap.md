# swap
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void swap(basic_string& str);                                // (1) C++98
void swap(basic_string& str) noexcept
  (allocator_traits<Allocator>::propagate_on_container_swap::value
   || allocator_traits<Allocator>::is_always_equal::value);  // (1) C++17
constexpr void swap(basic_string& str) noexcept
  (allocator_traits<Allocator>::propagate_on_container_swap::value
   || allocator_traits<Allocator>::is_always_equal::value);  // (1) C++20
```

## 概要
他の`basic_string`オブジェクトとデータを入れ替える。


## 効果
`*this`の内容を`str`と交換する。


## 戻り値
なし


## 計算量
定数時間


## 備考
- swapされるコンテナの要素を指す参照、ポインタ、イテレータを無効化しない。
    - ただし、[`end()`](end.md)が指すイテレータはどの要素も指していないが、無効になることがある。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string a = "hello";
  std::string b = "world";

  a.swap(b);

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* swap[color ff0000]

### 出力
```
world
hello
```

## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [LWG Issue 765. More on iterator validity](https://cplusplus.github.io/LWG/issue765)
    - C++11で、`swap()`が参照・ポインタ・イテレータを無効化しないという要件に対して、「`end()`が返すイテレータはどの要素も指していないため、無効化されることがある」という注記が追加された
