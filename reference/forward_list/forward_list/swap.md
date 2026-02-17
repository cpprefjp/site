# swap
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void
  swap(forward_list& x); // (1) C++11
void
  swap(forward_list& x)
    noexcept(
      allocator_traits<Allocator>::is_always_equal::value
    );                   // (1) C++17
constexpr void
  swap(forward_list& x)
    noexcept(
      allocator_traits<Allocator>::is_always_equal::value
    );                   // (1) C++26
```
* allocator_traits[link /reference/memory/allocator_traits.md]

## 概要
他の`forward_list`オブジェクトと値を入れ替える。


## 効果
`*this`の内容を`x`と交換する。


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <algorithm>

int main()
{
  std::forward_list<int> ls1 = {1, 2, 3};
  std::forward_list<int> ls2 = {4, 5, 6};

  ls1.swap(ls2);

  std::for_each(ls1.begin(), ls1.end(), [](int x) {
    std::cout << x << std::endl;
  });

  std::cout << std::endl;

  std::for_each(ls2.begin(), ls2.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* swap[color ff0000]
* begin()[link begin.md]
* end()[link end.md]

### 出力
```
4
5
6

1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]


## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
