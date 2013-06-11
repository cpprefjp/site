#emplace
```cpp
template <class... Args>
iterator emplace(Args&&... args);
```

##概要
コンテナ内へ要素を直接構築する


##要件
このコンテナの要素型 `value_type` は、コンテナに対して引数 `args` から直接構築可能（EmplaceConstructible）でなければならない。

ここで、コンテナに対して引数 `args` から直接構築可能とは、`m` をアロケータ型 `allocator_type` の lvalue、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

`std::`[`allocator_traits`](/reference/memory/allocator_traits)`<allocator_type>::construct(m, p, args);`


##効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` から構築された `value_type` のオブジェクト `t` をコンテナに挿入する。

なお、オブジェクト `t` は、構築後にコンテナにコピー、あるいはムーブされるわけではなく、コンテナ内に直接構築される。


##戻り値
追加された要素を指すイテレータ。


##例外
ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


##計算量
平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](./size.md)`()`)）。


##備考
- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。なお、標準に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](./bucket_count.md)`()` の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。<br/>それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。<br/>コンテナのバケット数が変わらない場合とは、要素追加後の要素数が、要素追加前のバケット数（[`bucket_count`](./bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](./max_load_factor.md)`()` の戻り値）よりも小さかった場合である。<br/>なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。[`reserve`](./reserve.md)`()` も参照。

このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。

`emplace_hint` も含めた一覧を以下に示す。

| | |
|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| シーケンスコンテナ | `template <class... Args>`<br/> `iterator emplace(const_iterator, Args&&...)` |
| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許さない場合） | `template <class... Args>`<br/> `pair<iterator, bool> emplace(Args&&...)` |
| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許す場合） | `template <class... Args>`<br/> `iterator emplace(Args&&...)` |
| 連想コンテナ、非順序連想コンテナ | `template <class... Args>`<br/> `iterator emplace_hint(const_iterator, Args&&...)` |


##例
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
  is(const is&) = delete; // emplace はコピーコンストラクタが無くても大丈夫
  is(is&&) = delete;      // もちろんムーブコンストラクタが無くても大丈夫
};

// サンプル用クラスのために std::hash を特殊化
namespace std {
  template <>
  struct hash<is> : private hash<int>, private hash<string> {
    size_t operator()(const is& v) const { return hash<int>::operator()(v.first) ^ hash<string>::operator()(v.second); }
  };
}

// サンプル用クラスのための挿入演算子
std::ostream& operator<<(std::ostream& os, const is& p)
{
  return os << '(' << p.first << ',' << p.second << ')';
}

int main()
{
  std::unordered_multiset<is> um;

  auto it1 = um.emplace(1, "1st");
  std::cout << *it1 << '\n';
  auto it2 = um.emplace(2, "2nd");
  std::cout << *it2 << '\n';
  auto it3 = um.emplace(1, "1st");
  std::cout << *it3 << '\n';

  //以下はコピー&ムーブコンストラクタが無いのでエラーになる
  //auto it4 = um.insert(is(3, "3rd"));
  //std::cout << *it4 << '\n';

  std::copy(um.cbegin(), um.cend(), std::ostream_iterator<is>(std::cout, ", "));
  std::cout << std::endl;
}
```
* iostream[link /reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* string[link /reference/string.md]
* utility[link /reference/utility.md]
* pair[link /reference/utility/pair.md]
* algorithm[link /reference/algorithm.md]
* copy[link /reference/algorithm/copy.md]
* iterator[link /reference/iterator.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* hash[link /reference/functional/hash.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]
* insert[link /reference/unordered_set/unordered_multiset/insert.md]
* cbegin[link /reference/unordered_set/unordered_multiset/cbegin.md]
* cend[link /reference/unordered_set/unordered_multiset/cend.md]

###出力
```
(1,1st)
(2,2nd)
(1,1st)
(2,2nd), (1,1st), (1,1st),
```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


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
|-------------------------------------------|--------------------------------------------------------|
| [`emplace_hint`](./emplace_hint.md)       | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](./insert.md)                   | 要素の追加 |
| [`bucket_count`](./bucket_count.md)       | バケット数の取得 |
| [`load_factor`](./load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](./max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`rehash`](./rehash.md)                   | 最小バケット数指定によるバケット数の調整 |
| [`reserve`](./reserve.md)                 | 最小要素数指定によるバケット数の調整 |

