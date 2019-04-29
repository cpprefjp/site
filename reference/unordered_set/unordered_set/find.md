# find
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator       find(const key_type& x);                    // (1) C++11
const_iterator find(const key_type& x) const;              // (2) C++11

iterator       find(const key_type& x, size_t hash);       // (3) C++20
const_iterator find(const key_type& x, size_t hash) const; // (4) C++20

template <class K> iterator       find(const K& k);        // (5) C++20
template <class K> const_iterator find(const K& k) const;  // (6) C++20

template <class K>
iterator       find(const K& k, size_t hash);              // (7) C++20
template <class K>
const_iterator find(const K& k, size_t hash) const;        // (8) C++20
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
コンテナ内で指定されたキーに合致する要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end`](end.md) （コンテナの最後の要素の次）を指すイテレータを返す。

- (1) : 非`const`な`*this`オブジェクトに対する検索
- (2) : `const`な`*this`オブジェクトに対する検索
- (3) : 非`const`な`*this`オブジェクトに対して、事前計算したハッシュ値をつけて検索
- (4) : `const`な`*this`オブジェクトに対して、事前計算したハッシュ値をつけて検索
- (5) : 非`const`な`*this`オブジェクトに対する透過的な検索
- (6) : `const`な`*this`オブジェクトに対する透過的な検索
- (7) : 非`const`な`*this`オブジェクトに対して、事前計算したハッシュ値をつけて透過的に検索
- (8) : `const`な`*this`オブジェクトに対して、事前計算したハッシュ値をつけて透過的に検索

(5)、(6)、(7)、(8)の透過的な検索は、`Hash::transparent_key_equal`が定義される場合に有効になる機能であり、例として`unordered_set<string> s;`に対して`s.find("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## 事前条件
- (3), (4) : 値`hash`と、[`hash_function()`](hash_function.md)`(x)`の戻り値が等値であること
- (7), (8) : 値`hash`と、[`hash_function()`](hash_function.md)`(k)`の戻り値が等値であること


## 戻り値
指定されたキーと等価なキーの要素を指すイテレータを返す。そのような要素がない場合には、[`end`](end.md)`()`を返す。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 備考
- コンテナが `const` の場合には `const_iterator`、そうでない場合には `iterator` が返るが、`unordered_set` の場合には、いずれにせよ読み取り専用イテレータである。
- (5), (6), (7), (8) : これらのオーバーロードは、`Hash::transparent_key_equal`型が定義される場合にのみ、オーバーロード解決に参加する
- (3), (4), (7), (8) : これらのオーバーロードは、キーに対するハッシュ値を事前に計算しておくことで、何度も同じキーで検索する場合に高速になる


## 例
### 基本的な使い方
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

#### 出力
```
9, 7, 5, 3, 1,
found 5 at 2
not found
```

### 事前計算しておいたハッシュ値を使用する (C++20)
```cpp example
#include <iostream>
#include <unordered_set>
#include <string>

int main()
{
  std::unordered_set<std::string> us = {"Alice", "Bob", "Carol"};

  // ハッシュ値を事前計算
  const char* key = "Alice";
  std::size_t hash = us.hash_function()(key);

  // 事前計算しておいたハッシュ値を、検索インタフェースにキーといっしょに渡すことで、
  // 内部でのハッシュ値計算を省略できる
  if (us.contains(key, hash)) {
    auto it = us.find(key, hash);
    std::cout << *it << std::endl;
  }
}
```
* find[color ff0000]
* us.hash_function()[link hash_function.md]
* us.contains[link contains.md]

#### 出力
```
Alice
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


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
- [P0920R2 Precalculated hash values in lookup](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0920r2.html)
