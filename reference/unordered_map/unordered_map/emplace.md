# emplace
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool> emplace(Args&&... args);
```

## 概要
コンテナ内へ要素を直接構築する


## テンプレートパラメータ制約
- このコンテナの要素型 `value_type` が、コンテナに対して引数 `args` から直接構築可能であること


## 効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` から構築された `value_type` のオブジェクトを `t` とすると、`t.first` と等価なキーがコンテナに既に存在していなければ、`t` をコンテナに挿入する。

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

- この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わらなかった（＝リハッシュが発生しなかった）場合、当該コンテナを指すイテレータは無効にはならない。  
	それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。  
	コンテナのバケット数が変わらない条件は、

	* この関数を呼び出した後の要素数が、呼び出す前のバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](max_load_factor.md)`()` の戻り値）以下である。

	となっている。  
	なお、この条件は C++14 までは「以下」ではなく「よりも小さい」だったため、最大負荷率の定義と不整合だった。  
	これは規格の誤りとして C++17 で修正されたが、使用する処理系やそのバージョンによっては以前の「よりも小さい」という条件でしかイテレータの有効性を保証していない可能性があるため、注意が必要である。

- C++17 で追加された [`try_emplace`](try_emplace.md) と異なり、この関数ではキー重複によって要素の挿入が行われなかった場合に引数が不変である（引数からのムーブが発生しない）という**保証はない**ので、注意すること。

- このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。  
	`emplace_hint` も含めた一覧を以下に示す。

	| コンテナ                                                              | シグネチャ                                                                         |
	|-----------------------------------------------------------------------|------------------------------------------------------------------------------------|
	| シーケンスコンテナ                                                    | `template <class... Args>`<br/> `iterator emplace(const_iterator, Args&&...)`      |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許さない場合） | `template <class... Args>`<br/> `pair<iterator, bool> emplace(Args&&...)`          |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許す場合）     | `template <class... Args>`<br/> `iterator emplace(Args&&...)`                      |
	| 連想コンテナ、非順序連想コンテナ                                      | `template <class... Args>`<br/> `iterator emplace_hint(const_iterator, Args&&...)` |


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <string>
#include <complex>
#include <tuple>
#include <utility>
#include <algorithm>

// サンプルで使用する型の別名
using sc = std::pair<const std::string, std::complex<double>>;

// サンプルで使用する型の別名のための挿入演算子
std::ostream& operator<<(std::ostream& os, const sc& p)
{
  return os << '{' << p.first << ',' << p.second << '}';
}

int main()
{
  std::unordered_map<std::string, std::complex<double>> um;
  std::cout << std::boolalpha;

  auto p1 = um.emplace("e", 2.718281828);
  std::cout << *p1.first << ' ' << p1.second << '\n';
  auto p2 = um.emplace("pi", 3.14159265);
  std::cout << *p2.first << ' ' << p2.second << '\n';
  auto p3 = um.emplace("pi", 3);
  std::cout << *p3.first << ' ' << p3.second << '\n';

  auto p4 = um.emplace(std::piecewise_construct, std::forward_as_tuple("i"), std::forward_as_tuple(0, 1));
  std::cout << *p4.first << ' ' << p4.second << '\n';

  std::for_each(um.cbegin(), um.cend(), [](const decltype(um)::value_type& p) {
    std::cout << p << ", ";
  });
  std::cout << std::endl;
}
```
* emplace[color ff0000]
* std::complex[link /reference/complex/complex.md]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* um.cbegin()[link cbegin.md]
* um.cend()[link cend.md]

### 出力
```
{e,(2.71828,0)} true
{pi,(3.14159,0)} true
{pi,(3.14159,0)} false
{i,(0,1)} true
{pi,(3.14159,0)}, {i,(0,1)}, {e,(2.71828,0)},
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


## 関連項目

| 名前                                      | 説明                                                   |
|-------------------------------------------|--------------------------------------------------------|
| [`emplace_hint`](emplace_hint.md)         | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`try_emplace`](try_emplace.md)           | キーが存在しない場合のみコンテナ内への要素の直接構築   |
| [`insert`](insert.md)                     | 要素の追加                                             |
| [`insert_or_assign`](insert_or_assign.md) | 要素の追加、あるいは代入                               |
| [`erase`](erase.md)                       | 要素の削除                                             |
| [`clear`](clear.md)                       | 全要素の削除                                           |
| [`swap`](swap.md)                         | 内容の交換                                             |
| [`bucket_count`](bucket_count.md)         | バケット数の取得                                       |
| [`load_factor`](load_factor.md)           | 現在の負荷率（バケットあたりの要素数の平均）を取得     |
| [`max_load_factor`](max_load_factor.md)   | 負荷率の最大値を取得、設定                             |
| [`rehash`](rehash.md)                     | 最小バケット数指定によるバケット数の調整               |
| [`reserve`](reserve.md)                   | 最小要素数指定によるバケット数の調整                   |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [LWG Issue 2156. Unordered containers' reserve(n) reserves for n-1 elements](https://wg21.cmeerw.net/lwg/issue2156)
