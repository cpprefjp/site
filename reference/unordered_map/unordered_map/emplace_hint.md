#emplace_hint(C++11)
```cpp
template <class... Args>
iterator emplace_hint(const_iterator position, Args&&... args);
```

##概要
挿入位置のヒントを使用してコンテナ内へ要素を直接構築する


##要件
このコンテナの要素型 `value_type` は、コンテナに対して引数 `args` から直接構築可能（EmplaceConstructible）でなければならない。

ここで、コンテナに対して引数 `args` から直接構築可能とは、`m` をアロケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

`std::`[`allocator_traits`](/reference/memory/allocator_traits)`::`[`construct`](/reference/memory/allocator_traits/construct)`(m, p, std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...);`

- 引数 `position` は、コンテナの有効な読み取り専用イテレータでなければならないが、間接参照可能（dereferenceable）である必要はない。（つまり、最終要素の次を指すイテレータでも良い）


##効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` から構築された `value_type` のオブジェクトを `t` とすると、`t.first` と等価なキーがコンテナに既に存在していなければ、`t` をコンテナに挿入する。

なお、オブジェクト `t` は、構築後にコンテナにコピー、あるいはムーブされるわけではなく、コンテナ内に直接構築される。

引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない。


##戻り値
新たな要素が追加された場合、その追加された要素を指すイテレータ。新たな要素が追加されなかった場合、既にあった要素を指すイテレータ。


##例外
ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


##計算量
平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](./size.md)`()`)）。


##備考
- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。なお、標準に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](./bucket_count.md)`()` の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。<br/>それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。<br/>コンテナのバケット数が変わらない場合とは、
	1. 追加しようとした要素と等価なキーの要素が既にコンテナに存在したため、要素が追加されなかった。
	2. 要素追加後の要素数が、要素追加前のバケット数（[`bucket_count`](./bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](./max_load_factor.md)`()` の戻り値）よりも小さかった。
<br/>のいずれかである。<br/>なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。[`reserve`](./reserve.md) も参照。

このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。 
`emplace` も含めた一覧を以下に示す。

| | |
|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| シーケンスコンテナ | `template <class... Args>`<br/> `iterator emplace(const_iterator, Args&&...)` |
| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許さない場合） | `template <class... Args>`<br/> `pair<iterator, bool> emplace(Args&&...)` |
| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許す場合） | `template <class... Args>`<br/> `iterator emplace(Args&&...)` |
| 連想コンテナ、非順序連想コンテナ | `template <class... Args>`<br/> `iterator emplace_hint(const_iterator, Args&&...)` |



##例
```cpp
#include <iostream>
#include <unordered_map>
#include <string>
#include <complex>
#include <tuple>
#include <utility>    // for std::pair
#include <algorithm>  // for std::for_each
#include <iterator>   // for std::next

int main()
{
  std::unordered_map<std::string, std::complex<double>> um;
  std::cout << std::boolalpha;

  auto it1 = um.emplace_hint(um.cend(), "e", 2.718281828);
  std::cout << '{' << it1->first << ',' << it1->second << "} at " << std::distance(um.begin(), it1) << '\n';
  auto it2 = um.emplace_hint(um.cbegin(), "pi", 3.14159265);
  std::cout << '{' << it2->first << ',' << it2->second << "} at " << std::distance(um.begin(), it2) << '\n';
  auto it3 = um.emplace_hint(um.cbegin(), "pi", 3);
  std::cout << '{' << it3->first << ',' << it3->second << "} at " << std::distance(um.begin(), it3) << '\n';

  auto it4 = um.emplace_hint(std::next(um.cbegin(), 1), std::piecewise_construct, std::forward_as_tuple("i"), std::forward_as_tuple(0, 1));
  std::cout << '{' << it4->first << ',' << it4->second << "} at " << std::distance(um.begin(), it4) << '\n';

  std::for_each(um.cbegin(), um.cend(), [](const decltype(um)::value_type& v) {
    std::cout << '{' << v.first << ',' << v.second << "}, ";
  });
  std::cout << std::endl;
}
```
* iostream[link /reference/iostream]
* unordered_map[link /reference/unordered_map.md]
* string[link /reference/string.md]
* complex[link /reference/complex.md]
* tuple[link /reference/tuple.md]
* utility[link /reference/utility.md]
* pair[link /reference/utility/pair.md]
* algorithm[link /reference/algorithm.md]
* for_each[link /reference/algorithm/for_each.md]
* iterator[link /reference/iterator.md]
* next[link /reference/iterator/next.md]
* cend[link /reference/unordered_map/unordered_map/cend.md]
* distance[link /reference/iterator/distance.md]
* begin[link /reference/unordered_map/unordered_map/begin.md]
* cbegin[link /reference/unordered_map/unordered_map/cbegin.md]
* piecewise_construct[link /reference/utility/piecewise_construct.md]
* forward_as_tuple[link /reference/tuple/tuple/forward_as_tuple.md]

###出力
```
{e,(2.71828,0)} at 0
{pi,(3.14159,0)} at 0
{pi,(3.14159,0)} at 0
{i,(0,1)} at 1
{pi,(3.14159,0)}, {i,(0,1)}, {e,(2.71828,0)},
```

注：[`unordered_map`](/reference/unordered_map/unordered_map.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): -
- [Clang, C++0x mode](/implementation#clang.md): 3.1
- [GCC](/implementation#gcc.md): -
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

##参照
| | |
|-------------------------------------------|------------------------------|
| [`emplace`](./emplace.md)                 | コンテナ内への要素の直接構築 |
| [`insert`](./insert.md)                   | 要素の追加 |
| [`bucket_count`](./bucket_count.md)       | バケット数の取得 |
| [`load_factor`](./load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](./max_load_factor.md) | 最大値負荷率を取得、設定 |
| [`rehash`](./rehash.md)                   | 最小バケット数指定によるバケット数の調整 |
| [`reserve`](./reserve.md)                 | 最小要素数指定によるバケット数の調整

