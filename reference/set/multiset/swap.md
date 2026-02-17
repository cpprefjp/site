# swap
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
void swap(multiset& st);                                                 // (1) C++03
void swap(multiset& x)
  noexcept(allocator_traits<Allocator>::is_always_equal::value
            && noexcept(swap(declval<Compare&>(),declval<Compare&>()))); // (1) C++17
constexpr void swap(multiset& x)
  noexcept(allocator_traits<Allocator>::is_always_equal::value
            && noexcept(swap(declval<Compare&>(),declval<Compare&>()))); // (1) C++26
```

## 概要
コンテナ内のコンテンツを、同じ型の要素を保持する他の `multiset` オブジェクトである `st` 内のコンテンツと交換する。サイズは異なる場合もある。  
このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は `st` へ、`st` 内にあった要素は `*this` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。 


## パラメータ
- `st`  
	`*this`とコンテンツを交換する、同じ型の `multiset` コンテナ。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> c1, c2;

  c1.insert(10);
  c1.insert(20);
  c1.insert(30);

  c2.insert(5);
  c2.insert(15);

  c1.swap(c2);

  std::multiset<int>::iterator i = c1.begin();
  while (i != c1.end()) {
    std::cout << *(i++) << ",";
  }
  std::cout << std::endl;
}
```
* swap[color ff0000]
* insert[link insert.md]
* c1.begin()[link begin.md]
* c1.end()[link end.md]

### 出力
```
5,15,
```

## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
