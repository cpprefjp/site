# find
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator find(const key_type& x);           // (1) C++11
constexpr iterator find(const key_type& x); // (1) C++26

const_iterator find(const key_type& x) const;           // (2) C++11
constexpr const_iterator find(const key_type& x) const; // (2) C++26

template <class K> iterator find(const K& k);           // (3) C++20
template <class K> constexpr iterator find(const K& k); // (3) C++26

template <class K> const_iterator find(const K& k) const;           // (4) C++20
template <class K> constexpr const_iterator find(const K& k) const; // (4) C++26
```

## 概要
コンテナ内で指定されたキーに合致する要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end`](end.md) （コンテナの最後の要素の次）を指すイテレータを返す。

- (1) : 非`const`な`*this`オブジェクトに対する検索
- (2) : `const`な`*this`オブジェクトに対する検索
- (3) : 非`const`な`*this`オブジェクトに対する透過的な検索
- (4) : `const`な`*this`オブジェクトに対する透過的な検索

(3), (4)の透過的な検索は、`Pred::is_transparent`および`Hash::is_transparent`が定義される場合に有効になる機能であり、例として`unordered_set<string> s;`に対して`s.find("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## テンプレートパラメータ制約
- (3), (4) : `Pred::is_transparent`型および`Hash::is_transparent`型が定義されていること


## 戻り値
指定されたキーと等価なキーの要素を指すイテレータを返す。そのような要素がない場合には、[`end`](end.md)`()`を返す。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 備考
- コンテナが `const` の場合には `const_iterator`、そうでない場合には `iterator` が返るが、`unordered_set` の場合には、いずれにせよ読み取り専用イテレータである。


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

  auto it1 = us.find(5);
  if (it1 == us.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found " << *it1 << " at " << std::distance(us.begin(), it1) << std::endl;
  }

  auto it2 = us.find(8);
  if (it2 == us.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found " << *it2 << " at " << std::distance(us.begin(), it2) << std::endl;
  }
}
```
* find[color ff0000]
* us.begin()[link begin.md]
* us.end()[link end.md]

### 出力例
```
9, 7, 5, 3, 1,
found 5 at 2
not found
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前 | 説明 |
|-----------------------------------|----------------------------|
| [`count`](count.md)             | 指定したキーの要素数を取得 |
| [`equal_range`](equal_range.md) | 指定したキーの範囲を取得   |


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
