# swap
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void
  swap(list& x);                                                   // (1) C++98
void
  swap(list& x)
    noexcept(allocator_traits<Allocator>::is_always_equal::value); // (1) C++17
constexpr void
  swap(list& x)
    noexcept(allocator_traits<Allocator>::is_always_equal::value); // (1) C++26
```

## 概要
他の`list`オブジェクトと値を入れ替える。


## 効果
`*this`の内容を`x`と交換する。


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
#include <list>

int main()
{
  std::list<int> ls1 = {1, 2, 3};
  std::list<int> ls2 = {4, 5, 6};

  ls1.swap(ls2);

  for (int x : ls1) {
    std::cout << x << std::endl;
  }

  std::cout << std::endl;

  for (int x : ls2) {
    std::cout << x << std::endl;
  }
}
```
* swap[color ff0000]

### 出力
```
4
5
6

1
2
3
```

## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [LWG Issue 765. More on iterator validity](https://cplusplus.github.io/LWG/issue765)
    - C++11で、`swap()`が参照・ポインタ・イテレータを無効化しないという要件に対して、「`end()`が返すイテレータはどの要素も指していないため、無効化されることがある」という注記が追加された
