# コンストラクタ
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
// ____要素数ゼロのflat_mapを構築____

flat_map() : flat_map(key_compare()) { } // (1) C++23

explicit flat_map(const key_compare& comp) // (2) C++23
  : c(), compare(comp) { }

template<class Allocator>
explicit flat_map(const Allocator& a); // (3) C++23

template<class Allocator>
flat_map(const key_compare& comp, const Allocator& a); // (4) C++23

// ____アロケータを伴うコピー＆ムーブコンストラクタ____

 template<class Allocator>
 flat_map(const flat_map& x, const Allocator& a); // (5) C++26

 template<class Allocator>
 flat_map(flat_map&& x, const Allocator& a); // (6) C++26

// ____key_container_typeとmapped_container_typeから構築____

flat_map(key_container_type key_cont, mapped_container_type mapped_cont,
         const key_compare& comp = key_compare()); // (7) C++23

template<class Allocator>
flat_map(const key_container_type& key_cont, const mapped_container_type& mapped_cont,
         const Allocator& a); // (8) C++23

template<class Allocator>
flat_map(const key_container_type& key_cont, const mapped_container_type& mapped_cont,
         const key_compare& comp, const Allocator& a); // (9) C++23

// ____key_container_typeとmapped_container_type（共にソート済み）から構築____

flat_map(sorted_unique_t, key_container_type key_cont, mapped_container_type mapped_cont,
         const key_compare& comp = key_compare()); // (10) C++23

template<class Allocator>
flat_map(sorted_unique_t, const key_container_type& key_cont,
         const mapped_container_type& mapped_cont, const Allocator& a); // (11) C++23

template<class Allocator>
flat_map(sorted_unique_t, const key_container_type& key_cont,
         const mapped_container_type& mapped_cont,
         const key_compare& comp, const Allocator& a); // (12) C++23

// ____イテレータから構築____

template<class InputIterator>
flat_map(InputIterator first, InputIterator last, const key_compare& comp = key_compare()) // (13) C++23
  : c(), compare(comp) { insert(first, last); }

template<class InputIterator, class Allocator>
flat_map(InputIterator first, InputIterator last, const Allocator& a); // (14) C++23

template<class InputIterator, class Allocator>
flat_map(InputIterator first, InputIterator last,
         const key_compare& comp, const Allocator& a); // (15) C++23

// ____イテレータ（ソート済み）から構築____

template<class InputIterator>
flat_map(sorted_unique_t s, InputIterator first, InputIterator last,
         const key_compare& comp = key_compare()) // (16) C++23
  : c(), compare(comp) { insert(s, first, last); }

template<class InputIterator, class Allocator>
flat_map(sorted_unique_t, InputIterator first, InputIterator last, const Allocator& a); // (17) C++23

template<class InputIterator, class Allocator>
flat_map(sorted_unique_t, InputIterator first, InputIterator last,
         const key_compare& comp, const Allocator& a); // (18) C++23

// ____Rangeから構築____

template<container-compatible-range<value_type> R>
flat_map(from_range_t fr, R&& rg) // (19) C++23
  : flat_map(fr, forward<R>(rg), key_compare()) { }

template<container-compatible-range<value_type> R>
flat_map(from_range_t, R&& rg, const key_compare& comp) // (20) C++23
  : flat_map(comp) { insert_range(forward<R>(rg)); }

template<container-compatible-range<value_type> R, class Allocator>
flat_map(from_range_t, R&& rg, const Allocator& a); // (21) C++23

template<container-compatible-range<value_type> R, class Allocator>
flat_map(from_range_t, R&& rg, const key_compare& comp, const Allocator& a); // (22) C++23

// ____initializer_listから構築____

flat_map(initializer_list<value_type> il, const key_compare& comp = key_compare()) // (23) C++23
  : flat_map(il.begin(), il.end(), comp) { }

template<class Allocator>
flat_map(initializer_list<value_type> il, const Allocator& a); // (24) C++23

template<class Allocator>
flat_map(initializer_list<value_type> il, const key_compare& comp, const Allocator& a); // (25) C++23

// ____initializer_list（ソート済み）から構築____

flat_map(sorted_unique_t s, initializer_list<value_type> il,
const key_compare& comp = key_compare()) // (26) C++23
  : flat_map(s, il.begin(), il.end(), comp) { }

template<class Allocator>
flat_map(sorted_unique_t, initializer_list<value_type> il, const Allocator& a); // (27) C++23

template<class Allocator>
flat_map(sorted_unique_t, initializer_list<value_type> il,
         const key_compare& comp, const Allocator& a); // (28) C++23
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* from_range_t[link ../../ranges/from_range_t.md]
* sorted_unique_t[link ../sorted_unique_t.md]
* forward[link ../../utility/forward.md]
* insert[link insert.md]
* insert_range[link insert_range.md]


## 概要
`flat_map`オブジェクトを次に示す通りの要素で初期化する。


## 効果
- (1) : デフォルトコンストラクタ。デフォルトの `key_compare` を作成し、要素を持たない空の `flat_map` オブジェクトを構築する。
- (2) : `key_compare` を受け取り、要素を持たない空の `flat_map` オブジェクトを構築する。
- (3) : アロケータを受け取り、要素を持たない空の `flat_map` オブジェクトを構築する。
- (4) : `key_compare` とアロケータを受け取り、`flat_map` 要素を持たない空の `flat_map` オブジェクトを構築する。
- (5) : アロケータを受け取り、`flat_map` オブジェクトをコピー構築する。
- (6) : アロケータを受け取り、`flat_map` オブジェクトをムーブ構築する。
- (7) : `key_container_type` と `mapped_container_type` から `flat_map` オブジェクトを構築する。構築に際し、`value_compare` に基づきソートされ、また、Key が重複している要素は削除される。
- (8) : アロケータを受け取り、`key_container_type` と `mapped_container_type` から `flat_map` オブジェクトを構築する。構築に際し、`value_compare` に基づきソートされ、また、Key が重複している要素は削除される。
- (9) : `key_compare` とアロケータを受け取り、`key_container_type` と `mapped_container_type` から `flat_map` オブジェクトを構築する。構築に際し、`value_compare` に基づきソートされ、また、Key が重複している要素は削除される。
- (10) : `key_container_type` と `mapped_container_type`（共にソート済み）から `flat_map` オブジェクトを構築する。
- (11) : アロケータを受け取り、`key_container_type` と `mapped_container_type`（共にソート済み）から `flat_map` オブジェクトを構築する。
- (12) : `key_compare` とアロケータを受け取り、`key_container_type` と `mapped_container_type`（共にソート済み）から `flat_map` オブジェクトを構築する。
- (13) : イテレータから `flat_map` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (14) : アロケータを受け取り、イテレータから `flat_map` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (15) : `key_compare` とアロケータを受け取り、イテレータから `flat_map` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (16) : イテレータ（ソート済み）から `flat_map` オブジェクトを構築する。
- (17) : アロケータを受け取り、イテレータ（ソート済み）から `flat_map` オブジェクトを構築する。
- (18) : `key_compare` とアロケータを受け取り、イテレータ（ソート済み）から `flat_map` オブジェクトを構築する。
- (19) : Rangeから `flat_map` オブジェクトを構築する。構築には [`insert_range()`](insert_range.md) が用いられる。
- (20) : `key_compare` を受け取り、Rangeから `flat_map` オブジェクトを構築する。。構築には [`insert_range()`](insert_range.md) が用いられる。
- (21) : アロケータを受け取り、Rangeから `flat_map` オブジェクトを構築する。。構築には [`insert_range()`](insert_range.md) が用いられる。
- (22) : `key_compare` とアロケータを受け取り、Rangeから `flat_map` オブジェクトを構築する。。構築には [`insert_range()`](insert_range.md) が用いられる。
- (23) : initializer_listから `flat_map` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (24) : アロケータを受け取り、initializer_listから `flat_map` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (25) : `key_compare` とアロケータを受け取り、initializer_listから `flat_map` オブジェクトを構築する。構築には [`insert()`](insert.md) が用いられる。
- (26) : initializer_list（ソート済み）から `flat_map` オブジェクトを構築する。
- (27) : アロケータを受け取り、initializer_list（ソート済み）から `flat_map` オブジェクトを構築する。
- (28) : `key_compare` とアロケータを受け取り、initializer_list（ソート済み）から `flat_map` オブジェクトを構築する。


## 計算量
- (1)-(4) : 定数時間。
- (5) : 引数 `x` のサイズに対して線形時間。
- (6) : 引数 `x` の `containers` をムーブした計算量と同じ。
- (7)-(9) : 引数 `key_cont` のサイズを `N` とすると、`key_cont` がソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (10)-(12) : 引数 `key_cont` および `mapped_cont` をムーブした計算量と同じ。
- (13)-(15) : 引数 `first` と `last` の距離を `N` とすると、イテレータの値が `value_compare` に基づきソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (16)-(18) : 引数 `first` と `last` の距離を `N` とすると、`N` に対して線形時間。
- (19)-(22) : [`ranges::distance`](../../iterator/ranges_distance.md)`(rg)` を `N` とすると、要素の値が `value_compare` に基づきソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (23)-(25) : 引数 `il` のサイズを `N` とすると、イテレータの値が `value_compare` に基づきソート済みなら `N` に対して線形時間。そうでなければ `N log(N)`。
- (26)-(28) : 引数 `il` のサイズを `N` とすると、`N` に対して線形時間。


## 備考
- 通常の（アロケータを指定しない）コピーコンストラクタとムーブコンストラクタは自動生成される。
- (7)-(12) において、引数の `key_cont` と `mapped_cont` のサイズが異なる場合の動作は定められていない。
- (7)-(9), (13)-(15), (23)-(25) において、Key が重複している要素は削除されるが、どの要素が削除されるかは定められていない。
- (3)-(6), (8), (9), (11), (12), (14), (15), (17), (18), (21), (22), (24), (25), (27), (28) は引数としてアロケータを受け取るが、引数のアロケータに対して [`uses_allocator`](uses_allocator.md) が `false` であれば、この引数は無視される。


## 例
```cpp example
#include <flat_map>
#include <iostream>
#include <string>
#include <vector>

void print(const std::flat_map<std::string, int>& fm)
{
  std::cout << "{" << std::endl;
  for (const auto& kv: fm) {
    std::cout << "  " << kv.first << ": " << kv.second << "," << std::endl;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::cout << "(1)" << std::endl;
  {
    std::flat_map<std::string, int> fm;
    print(fm);
  }
  std::cout << std::endl;

  std::cout << "(5)" << std::endl;
  {
    std::vector<std::string> keys = {"Alice", "Bob", "Carol"};
    std::vector<int> values = {3, 1, 4};

    std::flat_map<std::string, int> fm(keys, values);
    print(fm);
  }
  std::cout << std::endl;

  std::cout << "(23)" << std::endl;
  {
    std::initializer_list<std::pair<std::string, int>> elems = {{"Alice", 3}, {"Bob", 1}, {"Carol", 4}};

    std::flat_map<std::string, int> fm(elems);
    print(fm);
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
  Alice: 3,
  Bob: 1,
  Carol: 4,
}

(23)
{
  Alice: 3,
  Bob: 1,
  Carol: 4,
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
