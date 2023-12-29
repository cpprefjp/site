# count
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type count(const key_type& x) const; // (1) C++11

template <class K>
size_type count(const K& k) const;        // (2) C++20
```

## 概要
キーを検索し、コンテナ内に見つかった要素の数を返す。`unordered_set` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。

- (1) : キー`x`を検索し、合致する要素数を取得する
- (2) : キー`k`を透過的に検索し、合致する要素数を取得する

(2)の透過的な検索は、`Pred::is_transparent`および`Hash::is_transparent`が定義される場合に有効になる機能であり、例として`unordered_set<string> s;`に対して`s.count("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## テンプレートパラメータ制約
- (2) : `Pred::is_transparent`型および`Hash::is_transparent`型が定義されていること


## 戻り値
指定されたキーと同じ値のキーの要素が見つかったなら 1、そうでないなら 0を返す。

メンバ型 `size_type` は符号なし整数型である。


## 例外
投げない。


## 計算量
`x`と`k`を共通の変数`a`であるとして、

- 平均： O(`count(a)`)
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp example
#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  std::copy(us.begin(), us.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto c1 = us.count(5);
  std::cout << "count of 5:" << c1 << std::endl;

  auto c2 = us.count(8);
  std::cout << "count of 8:" << c2 << std::endl;
}
```
* count[color ff0000]
* us.begin()[link begin.md]
* us.end()[link end.md]

### 出力
```
9, 7, 5, 3, 1,
count of 5:1
count of 8:0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

| 名前 | 説明 |
|-----------------------------------|--------------------------|
| [`find`](find.md)               | 指定したキーの位置を検索 |
| [`equal_range`](equal_range.md) | 指定したキーの範囲を取得 |


## 参照
- [LWG Issue 2304. Complexity of `count` in unordered associative containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2304)
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
