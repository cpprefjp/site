# emplace_hint
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
iterator emplace_hint(const_iterator position, Args&&... args);
```

## 概要
挿入位置のヒントを使用してコンテナ内へ要素を直接構築する


## 要件
- 引数 `position` は、コンテナの有効な読み取り専用イテレータでなければならないが、間接参照可能（dereferenceable）である必要はない。（つまり、[`cend`](cend.md)`()` でも良い）


## テンプレートパラメータ制約
- このコンテナの要素型 `value_type` は、コンテナに対して引数 `args` から直接構築可能であること


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

- この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わらなかった（＝リハッシュが発生しなかった）場合、当該コンテナを指すイテレータは無効にはならない。  
	それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。  
	コンテナのバケット数が変わらない条件は、

	* この関数を呼び出した後の要素数が、呼び出す前のバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](max_load_factor.md)`()` の戻り値）以下である。

	となっている。  
	なお、この条件は C++14 までは「以下」ではなく「よりも小さい」だったため、最大負荷率の定義と不整合だった。  
	これは規格の誤りとして C++17 で修正されたが、使用する処理系やそのバージョンによっては以前の「よりも小さい」という条件でしかイテレータの有効性を保証していない可能性があるため、注意が必要である。

- これらの関数が呼ばれた後、たとえ呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わった（＝リハッシュが発生した）場合でも、等価なキーの要素同士の相対的な順序は変わらない。

- 引数 `position` は、C++14 までは間接参照可能（dereferenceable）でなければならない（つまり、[`cend`](cend.md)`()` ではいけない）との記載になっていたが、これは規格の誤りとして C++17 で修正された。

- このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。  
	`emplace` も含めた一覧を以下に示す。

	| コンテナ                                                              | シグネチャ                                                                         |
	|-----------------------------------------------------------------------|------------------------------------------------------------------------------------|
	| シーケンスコンテナ                                                    | `template <class... Args>`<br/> `iterator emplace(const_iterator, Args&&...)`      |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許さない場合） | `template <class... Args>`<br/> `pair<iterator, bool> emplace(Args&&...)`          |
	| 連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許す場合）     | `template <class... Args>`<br/> `iterator emplace(Args&&...)`                      |
	| 連想コンテナ、非順序連想コンテナ                                      | `template <class... Args>`<br/> `iterator emplace_hint(const_iterator, Args&&...)` |

- 本関数呼び出しで構築されるオブジェクトを `t` とすると、`t.first` と等価なキーの要素が既に存在する場合、`position` に応じて既存の要素と新規の要素が順序付けられると期待されるが、規格書にそのような規定は存在しない。
	従って、そのような期待はすべきではない。（下記の出力例も参照）

## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <string>
#include <utility>
#include <algorithm>
#include <iterator>

// サンプルで使用する型の別名
using is = std::pair<const int, std::string>;

// サンプルで使用する型の別名のための挿入演算子
std::ostream& operator<<(std::ostream& os, const is& p)
{
  return os << '(' << p.first << ',' << p.second << ')';
}

// 出力関数
template <class Iterator>
void print(const char* label, Iterator begin, Iterator end, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::for_each(begin, end, [&os](const is& p) { os << p << ", "; });
  os << '\n';
}

int main()
{
  std::unordered_multimap<int, std::string> um{ {1, "1st"}, {1, "2nd"}, {2, "3rd"}, };

  // 初期状態の出力
  print("before", um.cbegin(), um.cend());

  // 追加するデータと等価な範囲を取得
  auto p = um.equal_range(1);
  print("equal_range", p.first, p.second);

  // 等価な要素の間に emplace_hint でデータを追加
  auto it = um.emplace_hint(std::next(p.first), 1, "4th");
  std::cout << "emplace_hint : " << *it << '\n';

  // 追加結果の出力
  print("after", um.cbegin(), um.cend());
}
```
* emplace_hint[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]
* um.cbegin[link cbegin.md]
* um.cend[link cend.md]
* um.equal_range[link equal_range.md]

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

注：[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系

- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

| 名前                                      | 説明                                               |
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
- [LWG Issue 518. Are `insert` and `erase` stable for `unordered_multiset` and `unordered_multimap`?](https://wg21.cmeerw.net/lwg/issue518)
    - 安定性の保証が規定された経緯のレポート
- [LWG Issue 2156. Unordered containers' reserve(n) reserves for n-1 elements](https://wg21.cmeerw.net/lwg/issue2156)
