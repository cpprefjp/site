# swap
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
void
  swap(deque& other);                                              // (1) C++03
void
  swap(deque& x)
    noexcept(allocator_traits<Allocator>::is_always_equal::value); // (1) C++17
constexpr void
  swap(deque& x)
    noexcept(allocator_traits<Allocator>::is_always_equal::value); // (1) C++26
```

## 概要
他の`deque`オブジェクトとデータを入れ替える。


## 効果
`*this`と`other`のデータを交換する。


## 戻り値
なし


## 計算量
定数時間


## 備考
swapされるコンテナの要素を指す参照、ポインタ、イテレータを無効化しない。


## 例
```cpp example
#include <iostream>
#include <deque>

template <class T>
void print(const char* name, const std::deque<T>& c)
{
  std::cout << name << " : {";

  for (const T& x : c) {
    std::cout << x << " ";
  }

  std::cout << "}" << std::endl;
}

int main()
{
  std::deque<int> c1 = {1, 2, 3};
  std::deque<int> c2 = {4, 5, 6};

  c1.swap(c2);

  print("c1", c1);
  print("c2", c2);
}
```
* swap[color ff0000]

### 出力
```
c1 : {4 5 6 }
c2 : {1 2 3 }
```

## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
