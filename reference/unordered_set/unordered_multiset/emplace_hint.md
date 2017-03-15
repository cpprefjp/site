# emplace_hint
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
iterator emplace_hint(const_iterator position, Args&&... args);
```

## 概要
挿入位置のヒントを使用してコンテナ内へ要素を直接構築する


## 要件

- このコンテナの要素型 `value_type` は、コンテナに対して引数 `args` から直接構築可能（EmplaceConstructible）でなければならない。  
	ここで、コンテナに対して引数 `args` から直接構築可能とは、`m` をアロケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

	`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(m, p, std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...);`

- 引数 `position` は、コンテナの有効な読み取り専用イテレータでなければならないが、間接参照可能（dereferenceable）である必要はない。（つまり、最終要素の次を指すイテレータでも良い）


## 効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` から構築された `value_type` のオブジェクト `t` をコンテナに挿入する。

なお、オブジェクト `t` は、構築後にコンテナにコピー、あるいはムーブされるわけではなく、コンテナ内に直接構築される。

引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない。


## 戻り値
追加された要素を指すイテレータ。


## 例外
ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


## 計算量
平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](size.md)`()`)）。


## 備考
- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。

- この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。
	それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。  
	コンテナのバケット数が変わらない場合とは、要素追加後の要素数が、要素追加前のバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](max_load_factor.md)`()` の戻り値）よりも小さかった場合である。  
	なお、条件が「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。[`reserve`](reserve.md) も参照。

- このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。  
	`emplace` も含めた一覧を以下に示す。

	|                                                                       |                                                                                    |
	|-----------------------------------------------------------------------|------------------------------------------------------------------------------------|
	| シーケンスコンテナ                                                    | `template <class... Args>`<br/> `iterator emplace(const_iterator, Args&&...)`      |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許さない場合） | `template <class... Args>`<br/> `pair<iterator, bool> emplace(Args&&...)`          |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許す場合）     | `template <class... Args>`<br/> `iterator emplace(Args&&...)`                      |
	| 連想コンテナ、非順序連想コンテナ                                      | `template <class... Args>`<br/> `iterator emplace_hint(const_iterator, Args&&...)` |

- 本関数呼び出しで構築されるオブジェクト `t` と等価なキーの要素が既に存在する場合、`position` に応じて既存の要素と新規の要素が順序付けられると期待されるが、規格書にそのような規定は存在しない。
	従って、そのような期待はすべきではない。（下記の出力例も参照）

## 例
```cpp
#include <iostream>
#include <unordered_set>
#include <string>
#include <utility>    // for std::pair
#include <algorithm>  // for std::copy
#include <iterator>   // for std::ostream_iterator

// サンプル用クラス
struct is : std::pair<int, std::string> {
  is(int i, const char* s) : std::pair<int, std::string>(i, s) {}
};

// サンプル用クラスの比較演算子（first のみを比較）
bool operator==(const is& t, const is& u)
{
  return t.first == u.first;
}

bool operator!=(const is& t, const is& u)
{
  return t.first != u.first;
}

// サンプル用クラスのために std::hash を特殊化（first のみに依存）
namespace std {
  template <>
  struct hash<is> : private hash<int> {
    size_t operator()(const is& v) const { return hash<int>::operator()(v.first); }
  };
}

// サンプル用クラスのための挿入演算子
std::ostream& operator<<(std::ostream& os, const is& p)
{
  return os << '(' << p.first << ',' << p.second << ')';
}

// 出力関数
template <class Iterator>
void print(const char* label, Iterator begin, Iterator end, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::copy(begin, end, std::ostream_iterator<is>(os, ", "));
  os << '\n';
}

int main()
{
  std::unordered_multiset<is> um{ {1, "1st"}, {1, "2nd"}, {2, "3rd"}, };

  // 初期状態の出力
  print("before", um.cbegin(), um.cend());

  // 追加するデータと等価な範囲を取得
  auto p = um.equal_range(is(1, "4th"));
  print("equal_range", p.first, p.second);

  // 等価な要素の間に emplace_hint でデータを追加
  auto it = um.emplace_hint(std::next(p.first), 1, "4th");
  std::cout << "emplace_hint : " << *it << '\n';

  // 追加結果の出力
  print("after", um.cbegin(), um.cend());
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* string[link /reference/string.md]
* utility[link /reference/utility.md]
* pair[link /reference/utility/pair.md]
* algorithm[link /reference/algorithm.md]
* copy[link /reference/algorithm/copy.md]
* iterator[link /reference/iterator.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* hash[link /reference/functional/hash.md]
* ostream[link /reference/ostream/basic_ostream.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* cbegin[link cbegin.md]
* cend[link cend.md]
* equal_range[link /reference/unordered_set/unordered_multiset/equal_range.md]
* next[link /reference/iterator/next.md]
* emplace_hint[color ff0000]

### 出力
- libstdc++ の出力例（4.7.3 現在）  
	追加した要素 (1,4th) はヒントを無視して (1,2nd) と (1,1st) よりも前に追加されている。

	```
	before : (2,3rd), (1,2nd), (1,1st), 
	equal_range : (1,2nd), (1,1st), 
	emplace_hint : (1,4th)
	after : (2,3rd), (1,4th), (1,2nd), (1,1st), 
	```

- libc++ の出力例（2013/11/22 現在）  
	追加した要素 (1,4th) がヒントで指定した通り (1,1st) と (1,2nd) の間に追加されている。

	```
	before : (2,3rd), (1,1st), (1,2nd), 
	equal_range : (1,1st), (1,2nd), 
	emplace_hint : (1,4th)
	after : (2,3rd), (1,1st), (1,4th), (1,2nd), 
	```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系

- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

|                                           |                                                    |
|-------------------------------------------|----------------------------------------------------|
| [`emplace`](emplace.md)                 | コンテナ内への要素の直接構築                       |
| [`insert`](insert.md)                   | 要素の追加                                         |
| [`erase`](erase.md)                     | 要素の削除                                         |
| [`clear`](clear.md)                     | 全要素の削除                                       |
| [`swap`](swap.md)                       | 内容の交換                                         |
| [`bucket_count`](bucket_count.md)       | バケット数の取得                                   |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](max_load_factor.md) | 最大負荷率を取得、設定                             |
| [`rehash`](rehash.md)                   | 最小バケット数指定によるバケット数の調整           |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整               |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

