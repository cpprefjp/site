# emplace
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool> emplace(Args&&... args);
```

## 概要
コンテナ内へ要素を直接構築する


## 要件
このコンテナの要素型 `value_type` は、コンテナに対して引数 `args` から直接構築可能（EmplaceConstructible）でなければならない。

ここで、コンテナに対して引数 `args` から直接構築可能とは、`m` をア�ケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(m, p, std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...);`


## 効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` から構築された `value_type` のオブジェクトを `t` とすると、`t` と�価な�ーがコンテナに既に�在していなければ、`t` をコンテナに挿入する。

なお、オブジェクト `t` は、構築後にコンテナにコピー、あるいはムーブされるわけではなく、コンテナ内に直接構築される。


## 戻り値
`std::`[`pair`](/reference/utility/pair.md) の `bool` 部分（`second` 部）は、要素が追加されたら `true`、追加されなかったら（既にあったら）`false`。

`std::`[`pair`](/reference/utility/pair.md) の `iterator` 部分（`first` 部）は、追加された要素（`bool` 部分が `true` の場合）、あるいは、既にあった要素（`bool` 部分が `false` の場合）を指すイテレータ。


## 例外
ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


## 計算量
平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](size.md)`()`)）。


## 備考
- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。

- この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。
	それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。  
	コンテナのバケット数が変わらない場合とは、

	* 追加しようとした要素と�価な�ーの要素が既にコンテナに�在したため、要素が追加されなかった（つまり、戻り値の `pair` の `bool` 部分が、`false` だった）。
	* 要素追加後の要素数が、要素追加前のバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](max_load_factor.md)`()` の戻り値）よりも小さかった。

	のいずれかである。  
	なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。[`reserve`](reserve.md) も参照。

- 単一要素の追加の場合、通常は [`insert`](insert.md) を使用するよりも本関数を使用した方が効率が良い。しかし、実際は実装によって、[`insert`](insert.md) を使用した方が効率が良い場合が�在する。  
	例としては、引数の型が `value_type` と同一であり、かつ、引数と�価な要素が既に�在するため要素の追加が行われないケースがある。  
	そのケースの場合、引数と当該コンテナ内の要素を直接比較することができるため、コンテナ内での新規要素のためのメモリ割り当て、および、要素の構築（この場合はコピー・ムーブ）を行う必要は無いが、実際のところは構築してしまってから比較する実装が多いようである。このため、本来不必要なメモリ割り当て、構築、破棄、メモリ解放が行われてしまう。  
	一方で、[`insert`](insert.md) では、引数と当該コンテナ内の要素を直接比較できることは自明であるため、まず先に比較して�価な要素の�在が確認されるとそれらの処理は行われない実装が一般的である。

- このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。  
	`emplace_hint` も含めた一覧を以下に示す。

	| コンテナ                                                              | シグネチャ                                                                         |
	|-----------------------------------------------------------------------|------------------------------------------------------------------------------------|
	| シーケンスコンテナ                                                    | `template <class... Args>`<br/> `iterator emplace(const_iterator, Args&&...)`      |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一�ーの重複を許さない場合） | `template <class... Args>`<br/> `pair<iterator, bool> emplace(Args&&...)`          |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一�ーの重複を許す場合）     | `template <class... Args>`<br/> `iterator emplace(Args&&...)`                      |
	| 連想コンテナ、非順序連想コンテナ                                      | `template <class... Args>`<br/> `iterator emplace_hint(const_iterator, Args&&...)` |


## 例
```cpp example
#include <iostream>
#include <unordered_set>
#include <string>
#include <utility>
#include <algorithm>
#include <iterator>

// サンプル用クラス
struct is : std::pair<int, std::string> {
  is(int i, const char* s) : std::pair<int, std::string>(i, s) {}
  is(const is&) = delete; // emplace はコピーコンストラクタが無くても大丈夫
  is(is&&) = delete;      // もちろんムーブコンストラクタが無くても大丈夫
};

// サンプル用クラスのために std::hash を特殊化
namespace std {
  template <>
  struct hash<is> : private hash<int>, private hash<std::string> {
    std::size_t operator()(const is& v) const {
      return hash<int>::operator()(v.first) ^ hash<std::string>::operator()(v.second);
    }
  };
}

// サンプル用クラスのための挿入演算�
std::ostream& operator<<(std::ostream& os, const is& p)
{
  return os << '(' << p.first << ',' << p.second << ')';
}

int main()
{
  std::unordered_set<is> us;
  std::cout << std::boolalpha;

  auto p1 = us.emplace(1, "1st");
  std::cout << *p1.first << ' ' << p1.second << '\n';

  auto p2 = us.emplace(2, "2nd");
  std::cout << *p2.first << ' ' << p2.second << '\n';

  auto p3 = us.emplace(1, "1st");
  std::cout << *p3.first << ' ' << p3.second << '\n';

  //以下はコピー&ムーブコンストラクタが無いのでコンパイルエラーになる
  //auto p4 = us.insert(is(3, "3rd"));
  //std::cout << *p4.first << ' ' << p4.second << '\n';

  // 追加結果の出力
  std::copy(us.cbegin(), us.cend(), std::ostream_iterator<is>(std::cout, ", "));
  std::cout << std::endl;
}
```
* emplace[color ff0000]
* hash[link /reference/functional/hash.md]
* std::ostream[link /reference/ostream/basic_ostream.md]
* us.insert[link insert.md]
* us.cbegin()[link cbegin.md]
* us.cend()[link cend.md]

### 出力例
```
(1,1st) true
(2,2nd) true
(1,1st) false
(2,2nd), (1,1st), 
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力の最終行の出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系

- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

| 名前                                      | 説明                                                   |
|-------------------------------------------|--------------------------------------------------------|
| [`emplace_hint`](emplace_hint.md)       | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)                   | 要素の追加                                             |
| [`erase`](erase.md)                     | 要素の削除                                             |
| [`clear`](clear.md)                     | 全要素の削除                                           |
| [`swap`](swap.md)                       | 内容の交換                                             |
| [`bucket_count`](bucket_count.md)       | バケット数の取得                                       |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得     |
| [`max_load_factor`](max_load_factor.md) | 最大負荷率を取得、�定                                 |
| [`rehash`](rehash.md)                   | 最小バケット数指定によるバケット数の調整               |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整                   |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

