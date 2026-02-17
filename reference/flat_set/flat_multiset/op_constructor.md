# コンストラクタ
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
// ____要素数ゼロのflat_multisetを構築____

flat_multiset()
  : flat_multiset(key_compare()) { } // (1) C++23

explicit
  flat_multiset(const key_compare& comp) // (2) C++23
    : c(), compare(comp) { }
constexpr explicit
  flat_multiset(const key_compare& comp) // (2) C++26
    : c(), compare(comp) { }

template<class Allocator>
explicit
  flat_multiset(const Allocator& a); // (3) C++23
template<class Allocator>
constexpr explicit
  flat_multiset(const Allocator& a); // (3) C++26

template<class Allocator>
flat_multiset(const key_compare& comp,
              const Allocator& a);      // (4) C++23
template<class Allocator>
constexpr
  flat_multiset(const key_compare& comp,
                const Allocator& a);    // (4) C++26

// ____アロケータを伴うコピー＆ムーブコンストラクタ____

 template<class Allocator>
 constexpr
   flat_multiset(const flat_multiset& x,
                 const Allocator& a); // (5) C++26

 template<class Allocator>
 constexpr
   flat_multiset(flat_multiset&& x,
                 const Allocator& a); // (6) C++26

// ____container_typeから構築____

flat_multiset(container_type cont,
              const key_compare& comp = key_compare());   // (7) C++23
constexpr
  flat_multiset(container_type cont,
                const key_compare& comp = key_compare()); // (7) C++26

template<class Allocator>
flat_multiset(const container_type& cont,
              const Allocator& a);   // (8) C++23
template<class Allocator>
constexpr
  flat_multiset(const container_type& cont,
                const Allocator& a); // (8) C++26

template<class Allocator>
flat_multiset(const container_type& cont,
              const key_compare& comp,
              const Allocator& a);   // (9) C++23
template<class Allocator>
constexpr
  flat_multiset(const container_type& cont,
                const key_compare& comp,
                const Allocator& a); // (9) C++26

// ____container_type（ソート済み）から構築____

flat_multiset(sorted_equivalent_t,
              container_type cont,
              const key_compare& comp = key_compare());   // (10) C++23
constexpr
  flat_multiset(sorted_equivalent_t,
                container_type cont,
                const key_compare& comp = key_compare()); // (10) C++26

template<class Allocator>
flat_multiset(sorted_equivalent_t,
              const container_type& cont,
              const Allocator& a);   // (11) C++23
template<class Allocator>
constexpr
  flat_multiset(sorted_equivalent_t,
                const container_type& cont,
                const Allocator& a); // (11) C++26

template<class Allocator>
flat_multiset(sorted_equivalent_t,
              const container_type& cont,
              const key_compare& comp,
              const Allocator& a);   // (12) C++23
template<class Allocator>
constexpr
  flat_multiset(sorted_equivalent_t,
                const container_type& cont,
                const key_compare& comp,
                const Allocator& a); // (12) C++26

// ____イテレータから構築____
template<class InputIterator>
flat_multiset(InputIterator first,
              InputIterator last,
              const key_compare& comp = key_compare())   // (13) C++23
  : c(), compare(comp) { insert(first, last); }
template<class InputIterator>
constexpr
  flat_multiset(InputIterator first,
                InputIterator last,
                const key_compare& comp = key_compare()) // (13) C++26
    : c(), compare(comp) { insert(first, last); }

template<class InputIterator, class Allocator>
flat_multiset(InputIterator first,
              InputIterator last,
              const Allocator& a);   // (14) C++23
template<class InputIterator, class Allocator>
constexpr
  flat_multiset(InputIterator first,
                InputIterator last,
                const Allocator& a); // (14) C++26

template<class InputIterator, class Allocator>
flat_multiset(InputIterator first,
              InputIterator last,
              const key_compare& comp,
              const Allocator& a);   // (15) C++23
template<class InputIterator, class Allocator>
constexpr
  flat_multiset(InputIterator first,
                InputIterator last,
                const key_compare& comp,
                const Allocator& a); // (15) C++26

// ____イテレータ（ソート済み）から構築____
template<class InputIterator>
flat_multiset(sorted_equivalent_t s,
              InputIterator first,
              InputIterator last,
              const key_compare& comp = key_compare())   // (16) C++23
  : c(), compare(comp) { insert(s, first, last); }
template<class InputIterator>
constexpr
  flat_multiset(sorted_equivalent_t s,
                InputIterator first,
                InputIterator last,
                const key_compare& comp = key_compare()) // (16) C++26
    : c(), compare(comp) { insert(s, first, last); }

template<class InputIterator, class Allocator>
flat_multiset(sorted_equivalent_t,
              InputIterator first,
              InputIterator last,
              const Allocator& a);   // (17) C++23
template<class InputIterator, class Allocator>
constexpr
  flat_multiset(sorted_equivalent_t,
                InputIterator first,
                InputIterator last,
                const Allocator& a); // (17) C++26

template<class InputIterator, class Allocator>
flat_multiset(sorted_equivalent_t,
              InputIterator first,
              InputIterator last,
              const key_compare& comp,
              const Allocator& a); // (18) C++23
template<class InputIterator, class Allocator>
constexpr
  flat_multiset(sorted_equivalent_t,
                InputIterator first,
                InputIterator last,
                const key_compare& comp,
                const Allocator& a); // (18) C++26

// ____Rangeから構築____
template<container-compatible-range<value_type> R>
flat_multiset(from_range_t fr,
              R&& rg)   // (19) C++23
  : flat_multiset(fr, forward<R>(rg), key_compare()) { }
template<container-compatible-range<value_type> R>
constexpr
  flat_multiset(from_range_t fr,
                R&& rg) // (19) C++26
    : flat_multiset(fr, forward<R>(rg), key_compare()) { }

template<container-compatible-range<value_type> R>
flat_multiset(from_range_t,
              R&& rg,
              const key_compare& comp)   // (20) C++23
  : flat_multiset(comp) { insert_range(forward<R>(rg)); }
template<container-compatible-range<value_type> R>
constexpr
  flat_multiset(from_range_t,
                R&& rg,
                const key_compare& comp) // (20) C++26
    : flat_multiset(comp) { insert_range(forward<R>(rg)); }

template<container-compatible-range<value_type> R, class Allocator>
flat_multiset(from_range_t,
              R&& rg,
              const Allocator& a);   // (21) C++23
template<container-compatible-range<value_type> R, class Allocator>
constexpr
  flat_multiset(from_range_t,
                R&& rg,
                const Allocator& a); // (21) C++26

template<container-compatible-range<value_type> R, class Allocator>
flat_multiset(from_range_t,
              R&& rg,
              const key_compare& comp,
              const Allocator& a); // (22) C++23
template<container-compatible-range<value_type> R, class Allocator>
constexpr
  flat_multiset(from_range_t,
                R&& rg,
                const key_compare& comp,
                const Allocator& a); // (22) C++26

// ____initializer_listから構築____
flat_multiset(initializer_list<value_type> il,
              const key_compare& comp = key_compare())   // (23) C++23
  : flat_multiset(il.begin(), il.end(), comp) { }
constexpr
  flat_multiset(initializer_list<value_type> il,
                const key_compare& comp = key_compare()) // (23) C++26
    : flat_multiset(il.begin(), il.end(), comp) { }

template<class Allocator>
flat_multiset(initializer_list<value_type> il,
              const Allocator& a);   // (24) C++23
template<class Allocator>
constexpr
  flat_multiset(initializer_list<value_type> il,
                const Allocator& a); // (24) C++26

template<class Allocator>
flat_multiset(initializer_list<value_type> il,
              const key_compare& comp,
              const Allocator& a);   // (25) C++23
template<class Allocator>
constexpr
  flat_multiset(initializer_list<value_type> il,
                const key_compare& comp,
                const Allocator& a); // (25) C++26

// ____initializer_list（ソート済み）から構築____
flat_multiset(sorted_equivalent_t s,
              initializer_list<value_type> il,
              const key_compare& comp = key_compare())   // (26) C++23
  : flat_multiset(s, il.begin(), il.end(), comp) { }
constexpr
  flat_multiset(sorted_equivalent_t s,
                initializer_list<value_type> il,
                const key_compare& comp = key_compare()) // (26) C++26
  : flat_multiset(s, il.begin(), il.end(), comp) { }

template<class Allocator>
flat_multiset(sorted_equivalent_t,
              initializer_list<value_type> il,
              const Allocator& a);   // (27) C++23
template<class Allocator>
constexpr
  flat_multiset(sorted_equivalent_t,
                initializer_list<value_type> il,
                const Allocator& a); // (27) C++26

template<class Allocator>
flat_multiset(sorted_equivalent_t,
              initializer_list<value_type> il,
              const key_compare& comp,
              const Allocator& a);   // (28) C++23
template<class Allocator>
constexpr
  flat_multiset(sorted_equivalent_t,
                initializer_list<value_type> il,
                const key_compare& comp,
                const Allocator& a); // (28) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* from_range_t[link ../../ranges/from_range_t.md]
* sorted_equivalent_t[link ../sorted_equivalent_t.md]
* forward[link ../../utility/forward.md]
* insert[link insert.md]
* insert_range[link insert_range.md]


## 概要
`flat_multiset`オブジェクトを次に示す通りの要素で初期化する。


## 効果
- (1) : デフォルトコンストラクタ。デフォルトの `key_compare` を作成し、要素を持たない空の `flat_multiset` オブジェクトを構築する。
- (2) : `key_compare` を受け取り、要素を持たない空の `flat_multiset` オブジェクトを構築する。
- (3) : アロケータを受け取り、要素を持たない空の `flat_multiset` オブジェクトを構築する。
- (4) : `key_compare` とアロケータを受け取り、要素を持たない空の `flat_multiset` オブジェクトを構築する。
- (5) : アロケータを受け取り、`flat_multiset` オブジェクトをコピー構築する。
- (6) : アロケータを受け取り、`flat_multiset` オブジェクトをムーブ構築する。
- (7) : `container_type` から `flat_multiset` オブジェクトを構築する。構築に際し、`value_compare` に基づきソートされる。
- (8) : アロケータを受け取り、`container_type` から `flat_multiset` オブジェクトを構築する。構築に際し、`value_compare` に基づきソートされる。
- (9) : `key_compare` とアロケータを受け取り、`container_type` から `flat_multiset` オブジェクトを構築する。構築に際し、`value_compare` に基づきソートされる。
- (10) : `container_type`（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (11) : アロケータを受け取り、`container_type`（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (12) : `key_compare` とアロケータを受け取り、`container_type`（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (13) : イテレータから `flat_multiset` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (14) : アロケータを受け取り、イテレータから `flat_multiset` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (15) : `key_compare` とアロケータを受け取り、イテレータから `flat_multiset` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (16) : イテレータ（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (17) : アロケータを受け取り、イテレータ（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (18) : `key_compare` とアロケータを受け取り、イテレータ（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (19) : Rangeから `flat_multiset` オブジェクトを構築する。構築には [`insert_range()`](insert_range.md) が用いられる。
- (20) : `key_compare` を受け取り、Rangeから `flat_multiset` オブジェクトを構築する。構築には [`insert_range()`](insert_range.md) が用いられる。
- (21) : アロケータを受け取り、Rangeから `flat_multiset` オブジェクトを構築する。構築には [`insert_range()`](insert_range.md) が用いられる。
- (22) : `key_compare` とアロケータを受け取り、Rangeから `flat_multiset` オブジェクトを構築する。構築には [`insert_range()`](insert_range.md) が用いられる。
- (23) : initializer_listから `flat_multiset` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (24) : アロケータを受け取り、initializer_listから `flat_multiset` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (25) : `key_compare` とアロケータを受け取り、initializer_listから `flat_multiset` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (26) : initializer_list（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (27) : アロケータを受け取り、initializer_list（ソート済み）から `flat_multiset` オブジェクトを構築する。
- (28) : `key_compare` とアロケータを受け取り、initializer_list（ソート済み）から `flat_multiset` オブジェクトを構築する。


## 計算量
- (1)-(4) : 定数時間。
- (5) : 引数 `x` のサイズに対して線形時間。
- (6) : 引数 `x` の `container_type` をムーブした計算量と同じ。
- (7)-(9) : 引数 `cont` のサイズを `N` とすると、`cont` がソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (10)-(12) : 引数 `cont` をムーブした計算量と同じ。
- (13)-(15) : 引数 `first` と `last` の距離を `N` とすると、イテレータの値が `value_compare` に基づきソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (16)-(18) : 引数 `first` と `last` の距離を `N` とすると、`N` に対して線形時間。
- (19)-(22) : [`ranges::distance`](../../iterator/ranges_distance.md)`(rg)` を `N` とすると、要素の値が `value_compare` に基づきソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (23)-(25) : 引数 `il` のサイズを `N` とすると、イテレータの値が `value_compare` に基づきソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (26)-(28) : 引数 `il` のサイズを `N` とすると、`N` に対して線形時間。


## 備考
- 通常の（アロケータを指定しない）コピーコンストラクタとムーブコンストラクタは自動生成される。
- (3)-(6), (8), (9), (11), (12), (14), (15), (17), (18), (21), (22), (24), (25), (27), (28) は引数としてアロケータを受け取るが、引数のアロケータに対して [`uses_allocator`](uses_allocator.md) が `false` であれば、この引数は無視される。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>
#include <vector>

void print(const std::flat_multiset<std::string>& fs)
{
  std::cout << "{" << std::endl;
  for (const auto& k: fs) {
    std::cout << "  " << k << "," << std::endl;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::cout << "(1)" << std::endl;
  {
    std::flat_multiset<std::string> fs;
    print(fs);
  }
  std::cout << std::endl;

  std::cout << "(5)" << std::endl;
  {
    std::vector<std::string> strs = {"Alice", "Bob", "Carol"};

    std::flat_multiset<std::string> fs(strs);
    print(fs);
  }
  std::cout << std::endl;

  std::cout << "(23)" << std::endl;
  {
    std::initializer_list<std::string> elems = {"Alice", "Bob", "Carol"};

    std::flat_multiset<std::string> fs(elems);
    print(fs);
  }
  std::cout << std::endl;
}
```

### 出力
```
(1)
{
}

(5)
{
  Alice,
  Bob,
  Carol,
}

(23)
{
  Alice,
  Bob,
  Carol,
}
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|---------------------------------------|--------------------------------------------|
| [`uses_allocator`](uses_allocator.md) | 指定されたアロケータと合致するかをチェックする |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
