# insert
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pair<iterator, bool> insert(const value_type& v);              // (1)
pair<iterator, bool> insert(value_type&& v);                   // (2) C++17

template <class P>
pair<iterator, bool> insert(P&& obj);                          // (3)

iterator insert(const_iterator position, const value_type& v); // (4)
iterator insert(const_iterator hint, value_type&& v);          // (5) C++17

template <class P>
iterator insert(const_iterator position, P&& obj);             // (6)

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (7)

void insert(initializer_list<value_type> il);                  // (8)

insert_return_type insert(node_type&& nh);                     // (9) C++17
iterator insert(const_iterator hint, node_type&& nh);          // (10) C++17
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
コンテナに要素を追加する。


## テンプレートパラメータ制約
- (1), (4) : `value_type` はこのコンテナに対してコピー挿入可能であること
- (2), (5) : `value_type` はこのコンテナに対してムーブ挿入可能であること
- (3), (6) :
    - `value_type` は引数 `obj` からこのコンテナに対して直接構築可能であること
    - [`std::constructible_from`](/reference/concepts/constructible_from.md)`<value_type, P&&>`要件を満たすこと
        - なお、C++11 では「`P` が `value_type` に暗黙変換可能」という、より厳しい条件の記載になってしまっていた。これは規格の誤りとして C++14 で修正されたが、使用する処理系やバージョンによる挙動の差異に注意が必要である
- (4), (6) : `position` は、このコンテナの有効な読み取り専用イテレータであること
- (7) :
    - 引数 `first`、および、`last`は、入力イテレータの要件を満たし、参照先の要素は `value_type` 型で、かつ、イテレータ範囲 `[first, last)` がこのコンテナ **以外を指す** 有効な範囲であること
    - このコンテナの要素型 `value_type` は、コンテナに対して `*first` から直接構築可能であること
- (8) : `value_type` はこのコンテナに対してコピー挿入可能であること
- (9), (10) : `nh` は空である、または、`(*this).get_allocator() == nh.get_allocator()`でなければならない


## 効果
- (1), (2) :
    - `v.first` と等価なキーがこのコンテナに存在していなければ、当該要素を追加する
- (3) :
    - 引数 `obj` から構築されたオブジェクトを `v` とすると、`v.first` と等価なキーがこのコンテナに存在していなければ、当該要素を追加する
    - このバージョンの動作は、[`emplace`](emplace.md)`(`[`std::forward`](/reference/utility/forward.md)`<P>(obj))` を呼び出した場合と等価である
- (4), (5) :
    - `v.first` と等価なキーがこのコンテナに存在していなければ、当該要素を追加する
    - 引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない
- (6) :
    - 引数 `obj` から構築されたオブジェクトを `v` とすると、`v.first` と等価なキーがこのコンテナに存在していなければ、当該要素を追加する
    - 引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない
    - このバージョンの動作は、[`emplace_hint`](emplace_hint.md)`(hint,` [`std::forward`](/reference/utility/forward.md)`<P>(obj))` を呼び出した場合と等価である
- (7) :
    - イテレータ範囲 `[first, last)` のすべての要素 `t` に対して、`insert(t)` を呼び出した場合と等価である（`*first` の型によって (1)、あるいは(3)の形式が呼び出される）。
- (8) :
    - (7)の形式を `insert(il.`[`begin`](/reference/initializer_list/initializer_list/begin.md)`(), il.`[`end`](/reference/initializer_list/initializer_list/end.md)`())` として呼び出した場合と等価である
- (9) :
    - `nh`が空の場合、効果はない
    - それ以外の場合、`nh.key()`と等価のキーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する
- (10) :
    - `nh`が空の場合、効果はなく、`(*this).end()`を返す
    - それ以外の場合、`nh.key()`と等価のキーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。`nh.key()`と等価のキーの要素を指すイテレータを常に返す
    - 要素は、`hint`の直前の位置のできるだけ近くに挿入される


## 戻り値
- (1), (2), (3) :
    - [`pair`](/reference/utility/pair.md) の `bool` 部分（`second` 部）は、要素が追加されたら `true`、追加されなかったら（既にあったら）`false`を返す
    - [`pair`](/reference/utility/pair.md) の `iterator` 部分（`first` 部）は、追加された要素（`bool` 部分が `true` の場合）、あるいは、既にあった要素（`bool` 部分が `false` の場合）を指すイテレータを返す
- (4), (5), (6) :
    - 新たな要素が追加された場合、その追加された要素を指すイテレータを返す
    - 新たな要素が追加されなかった場合、すでにあった要素を指すイテレータを返す
- (7), (8) : なし
- (9) :
    - [`insert_return_type`](/reference/map/map.md)を返す。`insert_return_type`のイテレータ型メンバ変数`position`、`bool`型メンバ変数`inserted`に格納される値は(1), (2), (3)のものと同じ情報である。`nh`が空の場合は、`position`は終端イテレータである。`node_type`型メンバ変数`node`には、
        - 挿入された場合には、空の[ノードハンドル](/reference/node_handle/node_handle.md)
        - 挿入されなかった場合には、`nh`の値である
- (10) : `nh`が空の場合、`(*this).end()`を返す。そうではない場合、`nh`と等価のキーの要素を指すイテレータを常に返す


## 例外
単一要素の形式（(1)から(6)）では、ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


## 計算量
- (1)から(6) : 平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size`](size.md)`()` に比例（O(N)）。
- (7) : 平均的なケースでは引数の範囲の要素数 [`std::distance`](/reference/iterator/distance.md)`(first, last)` に比例（O(N)）するが、最悪のケースでは引数の範囲の要素数 [`std::distance`](/reference/iterator/distance.md)`(first, last)` とコンテナの要素数 [`size`](size.md)`()` に 1 加えたものの積に比例（O([`std::distance`](/reference/iterator/distance.md)`(first, last) * (`[`size`](size.md)`() + 1)`)）。
- (8) : (7)の形式を `insert(il.`[`begin`](/reference/initializer_list/initializer_list/begin.md)`(), il.`[`end`](/reference/initializer_list/initializer_list/end.md)`())` として呼び出した場合と等価。
- (9), (10) : 平均的なケースでは `O(1)`、最悪のケースでは `O(size())`。


## 備考
- これらの関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。

- これらの関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わらなかった（＝リハッシュが発生しなかった）場合、当該コンテナを指すイテレータは無効にはならない。  
	それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。  
	コンテナのバケット数が変わらない条件は、

	* これらの関数を呼び出した後の要素数が、呼び出す前のバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](max_load_factor.md)`()` の戻り値）以下である。

	となっている。  
	なお、この条件は C++14 までは「以下」ではなく「よりも小さい」だったため、最大負荷率の定義と不整合だった。  
	これは規格の誤りとして C++17 で修正されたが、使用する処理系やそのバージョンによっては以前の「よりも小さい」という条件でしかイテレータの有効性を保証していない可能性があるため、注意が必要である。
- `unordered_map` では、キーのハッシュ値に基づいて要素を格納するバケットを決定するため、`position` を有効に使用することはできないものと思われる。  
	実際、GCC(libstdc++)、および、Clang(libc++) では `position` は単に無視される。  
	通常は、`position` の無いバージョンを使用した方が良いだろう。
- 引数 `position` は、C++14 までは間接参照可能（dereferenceable）でなければならない（つまり、[`cend`](cend.md)`()` ではいけない）との記載になっていたが、これは規格の誤りとして C++17 で修正された。  
	しかし、上記の通り `position` は実際には使用されていない可能性が高く、この変更による影響はほぼないと思われる。
- 上記の要件に示したように、`first`、および、`last` の参照先の要素は `value_type` 型でなければならないとされているが、その要件を満たさなくてももう一つの要件である直接構築可能を満たすだけで十分にライブラリを実装可能と思われる。  
	実際、Clang(libc++) は `first`、および、`last` の参照先の要素が `value_type` 型でなくとも (7) の形式を使用可能である。
- C++17 で追加された [`try_emplace`](try_emplace.md) と異なり、これらの関数ではキー重複によって要素の挿入が行われなかった場合に引数が不変である（引数からのムーブが発生しない）という**保証はない**ので、注意すること。
- (9), (10) の場合、要素はコピーもムーブもされない。


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <forward_list>
#include <algorithm>
#include <string>
#include <utility>
#include <initializer_list>

using cis = std::pair<const int, std::string>;
using is  = std::pair<int, std::string>;

std::ostream& operator<<(std::ostream& os, const cis& p)
{
    return os << '(' << p.first << ',' << p.second << ')';
}

template <class C>
void print(const char* label, const C& c, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::for_each(c.cbegin(), c.cend(), [&os](const cis& p) { os << p << ", "; });
  os << '\n';
}

int main()
{
  std::cout << std::boolalpha;

  // 一つの要素を挿入（(1), (2)の形式）
  {
    std::unordered_map<int, std::string> um{ {0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"}, };

    auto p1 = um.insert(cis{6, "6th"}); // 追加されるケース
    std::cout << p1.second << ' ' << *p1.first << ' ';
    auto p2 = um.insert(cis{2, "2nd"}); // 追加されないケース
    std::cout << p2.second << ' ' << *p2.first << std::endl;
    print("insert one element", um);
  }

  // 一つの要素を挿入（(3)の形式）
  {
    std::unordered_map<int, std::string> um{ {0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"}, };

    auto p1 = um.insert(is{6, "6th"}); // 追加されるケース
    std::cout << p1.second << ' ' << *p1.first << ' ';
    auto p2 = um.insert(is{2, "2nd"}); // 追加されないケース
    std::cout << p2.second << ' ' << *p2.first << std::endl;
    print("insert one element", um);
  }

  // 一つの要素を挿入（(4), (5)の形式）
  {
    std::unordered_map<int, std::string> um{ {0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"}, };

    auto it1 = um.insert(um.cbegin(), cis{6, "6th"}); // 追加されるケース
    std::cout << *it1 << ' ';
    auto it2 = um.insert(um.cbegin(), cis{2, "2nd"}); // 追加されないケース
    std::cout << *it2 << std::endl;
    print("insert one element with hint", um);
  }

  // 一つの要素を挿入（(6)の形式）
  {
    std::unordered_map<int, std::string> um{ {0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"}, };

    auto it1 = um.insert(um.cbegin(), is{6, "6th"}); // 追加されるケース
    std::cout << *it1 << ' ';
    auto it2 = um.insert(um.cbegin(), is{2, "2nd"}); // 追加されないケース
    std::cout << *it2 << std::endl;
    print("insert one element with hint", um);
  }

  // 複数の要素を挿入（(7)の形式）
  {
    std::unordered_map<int, std::string> um{ {0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"}, };

    std::forward_list<std::pair<short, const char*>> fl{ {5, "5th"}, {6, "6th"}, {0, "0th"}, {8, "8th"}, {7, "7th"}, };
    um.insert(fl.cbegin(), fl.cend()); // forward_list の要素を全部
    print("insert range", um);
  }

  // 複数の要素を挿入（(8)の形式）
  {
    std::unordered_map<int, std::string> um{ {0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"}, };

    um.insert({ {5, "5th"}, {6, "6th"}, {0, "0th"}, {8, "8th"}, {7, "7th"}, });
    print("insert initializer_list", um);
  }
}
```
* insert[color ff0000]
* um.cbegin()[link cbegin.md]
* fl.cbegin()[link /reference/forward_list/forward_list/cbegin.md]
* fl.cend()[link /reference/forward_list/forward_list/cend.md]

### 出力
```
true (6,6th) false (2,two)
insert one element : (6,6th), (5,five), (4,four), (3,three), (2,two), (1,one), (0,zero), 
true (6,6th) false (2,two)
insert one element : (6,6th), (5,five), (4,four), (3,three), (2,two), (1,one), (0,zero), 
(6,6th) (2,two)
insert one element with hint : (6,6th), (5,five), (4,four), (3,three), (2,two), (1,one), (0,zero), 
(6,6th) (2,two)
insert one element with hint : (6,6th), (5,five), (4,four), (3,three), (2,two), (1,one), (0,zero), 
insert range : (7,7th), (8,8th), (6,6th), (5,five), (4,four), (3,three), (2,two), (1,one), (0,zero), 
insert initializer_list : (7,7th), (8,8th), (6,6th), (5,five), (4,four), (3,three), (2,two), (1,one), (0,zero), 
```

注：[`unordered_map`](/reference/unordered_map/unordered_map.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

### 備考
- Clang 3.3 以降は C++17 モードでなくても C++17 の条件でのリハッシュとなっている。
- GCC は 8.2.0 時点でまだ C++17 の条件でのリハッシュとなっていない。また、バージョンによってリハッシュ条件が微妙に異なるため注意。


## 実装例
(4)以降の形式は、(1), (2), (3)の形式を使って実装することができる。

```cpp
template <class Key, class Hash, class Pred, class Allocator>
inline iterator unordered_map<Key, Hash, Pred, Allocator>::insert(const_iterator, const value_type& v)
{
  return insert(v).first;
}

template <class Key, class Hash, class Pred, class Allocator>
template <class P>
inline iterator unordered_map<Key, Hash, Pred, Allocator>::insert(const_iterator, P&& obj)
{
  return insert(std::forward<P>(obj)).first;
}

template <class Key, class Hash, class Pred, class Allocator>
template <class InputIterator>
inline void unordered_map<Key, Hash, Pred, Allocator>::insert(InputIterator first, InputIterator last);
{
  for (; first != last; ++first)
    insert(*first);
}

template <class Key, class Hash, class Pred, class Allocator>
inline void unordered_map<Key, Hash, Pred, Allocator>::insert(initializer_list<Key> il);
{
  insert(il.begin(), il.end());
}
```
* forward[link /reference/utility/forward.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* insert[color ff0000]


## 関連項目

| 名前                                      | 説明                                                   |
|-------------------------------------------|--------------------------------------------------------|
| [`emplace`](emplace.md)                 | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md)       | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`erase`](erase.md)                     | 要素の削除                                             |
| [`clear`](clear.md)                     | 全要素の削除                                           |
| [`swap`](swap.md)                       | 内容の交換                                             |
| [`bucket_count`](bucket_count.md)       | バケット数の取得                                       |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得     |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定                             |
| [`rehash`](rehash.md)                   | 最小バケット数指定によるバケット数の調整               |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整                   |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (8)の経緯となる提案文書
- [LWG Issue 2005. `unordered_map::insert(T&&)` protection should apply to `map` too](https://wg21.cmeerw.net/lwg/issue2005)
- [LWG Issue 2540. unordered_multimap::insert hint iterator](https://wg21.cmeerw.net/lwg/issue2540)
- [LWG Issue 2156. Unordered containers' reserve(n) reserves for n-1 elements](https://wg21.cmeerw.net/lwg/issue2156)
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
    - (9), (10)経緯となる提案文書
- [How useful is the hint passed to the std::unordered_... collections? - The Old New Thing](https://devblogs.microsoft.com/oldnewthing/20241028-00/?p=110428)
