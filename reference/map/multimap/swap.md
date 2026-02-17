# swap
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
void
  swap(multimap<Key,T, Compare,Allocator>& st);                            // (1) C++03
void
  swap(multimap& x)
    noexcept(allocator_traits<Allocator>::is_always_equal::value
              && noexcept(swap(declval<Compare&>(),declval<Compare&>()))); // (1) C++17
constexpr void
  swap(multimap& x)
    noexcept(allocator_traits<Allocator>::is_always_equal::value
              && noexcept(swap(declval<Compare&>(),declval<Compare&>()))); // (1) C++26
```

## 概要
コンテナ内のコンテンツを、同じ型の要素を保持する他の `multimap` オブジェクトである `st` 内のコンテンツと交換する。サイズは異なる場合もある。 
このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は `st` へ、`st` 内にあった要素は `*this` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。 


## パラメータ
- `st`  `*this`とコンテンツを交換する、同じ型の `multimap` コンテナ。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <map>

template <class Map>
void print(const char* name, const Map& m)
{
  std::cout << name << " : {";
  for (const auto& x : m) {
    std::cout << "[" << x.first << "," << x.second << "], ";
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::multimap<int, char> m1;
  m1.insert(std::make_pair(10, 'a'));
  m1.insert(std::make_pair(20, 'b'));
  m1.insert(std::make_pair(30, 'c'));

  std::multimap<int, char> m2;
  m2.insert(std::make_pair(5, 'd'));
  m2.insert(std::make_pair(15, 'e'));

  // m1とm2を入れ替える
  m1.swap(m2);

  print("m1", m1);
  print("m2", m2);
}
```
* swap[color ff0000]
* insert[link insert.md]

### 出力
```
m1 : {[5,d], [15,e], }
m2 : {[10,a], [20,b], [30,c], }
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
