# swap
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void
  swap(list& x);                                                   // (1) C++03
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
