# find
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator find(const key_type& k);
const_iterator find(const key_type& k) const;
```

## 概要
指定されたキーの位置を検索する。


## 戻り値
引数 `k` と等価なキーの要素を指すイテレータを返す。そのような要素がない場合には、[`end`](end.md)`()`を返す。


## 計算量
平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数 [`size`](size.md)`()` に比例（O([`size`](size.md)`()`)）。


## 備考
- コンテナが `const` の場合には `const_iterator`、そうでない場合には `iterator` が返るが、`unordered_multiset` の場合には、いずれにせよ読み取り専用イテレータである。
- 引数 `k` と等価なキーの要素が複数あった場合に、どの要素を指すイテレータが返されるかは標準では明確にされていない。ハッシュ関数を使用してバケットに格納するという `unordered_multiset` の要件を考えると、よほどひねくれた実装にしない限りイテレータの走査順で先頭の要素を指すイテレータが返されるものと思われるが、[`equal_range`](equal_range.md)`()` を使えば確実に先頭の要素を指すイテレータを取得することができる。


## 例
```cpp example
#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_multiset<int> ums{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };

  std::copy(ums.begin(), ums.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto it1 = ums.find(5);
  if (it1 == ums.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found " << *it1 << " at " << std::distance(ums.begin(), it1) << std::endl;
  }

  auto it2 = ums.find(8);
  if (it2 == ums.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found " << *it2 << " at " << std::distance(ums.begin(), it2) << std::endl;
  }
}
```
* find[color ff0000]
* ums.begin()[link begin.md]
* ums.end()[link end.md]

### 出力
```
9, 9, 7, 7, 5, 5, 1, 1, 3, 3,
found 5 at 4
not found
```

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

| 名前 | 説明 |
|-----------------------------------|----------------------------|
| [`count`](count.md)             | 指定したキーの要素数を取得 |
| [`equal_range`](equal_range.md) | 指定したキーの範囲を取得   |

