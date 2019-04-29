# contains
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool contains(const key_type& x) const;              // (1)
bool contains(const key_type& x, size_t hash) const; // (2)

template <class K>
bool contains(const K& k) const;                     // (3)
template <class K>
bool contains(const K& k, size_t hash) const;        // (4)
```
* size_t[link /reference/cstddef/size_t.md]


## 概要
指定されたキーに一致する要素がコンテナに含まれているかを判定する。

- (1) : キー`x`を検索し、合致する要素が含まれるかを判定する
- (2) : キー`x`を、事前計算したハッシュ値をつけて検索し、合致する要素が含まれるかを判定する
- (3) : キー`k`を透過的に検索し、合致する要素が含まれるかを判定する
- (4) : キー`k`を、事前計算したハッシュ値をつけて透過的に検索し、合致する要素が含まれるかを判定する

(3)と(4)の透過的な検索は、`Hash::transparent_key_equal`が定義される場合に有効になる機能であり、例として`unordered_multimap<string, int> m;`に対して`m.contains("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## 事前条件
- (2) : 値`hash`と、[`hash_function()`](hash_function.md)`(x)`の戻り値が等値であること
- (4) : 値`hash`と、[`hash_function()`](hash_function.md)`(k)`の戻り値が等値であること


## 戻り値
`x`と`k`を共通の変数`a`であるとして、以下と等価：

```cpp
return find(a) != end();
```
* find[link find.md]
* end()[link end.md]


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 備考
- (3), (4) : このオーバーロードは、`Hash::transparent_key_equal`型が定義される場合にのみ、オーバーロード解決に参加する
- (2), (4) : これらのオーバーロードは、キーに対するハッシュ値を事前に計算しておくことで、何度も同じキーで検索する場合に高速になる


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<char, int> um = {
    {'a', 3},
    {'b', 1},
    {'c', 4}
  };

  // キー'b'の要素が含まれているか
  if (um.contains('b')) {
    std::cout << "contain" << std::endl;
  }
  else {
    std::cout << "doesn't contain" << std::endl;
  }
}
```
* contains[color ff0000]

#### 出力
```
contain
```

### 事前計算しておいたハッシュ値を使用する
```cpp example
#include <iostream>
#include <unordered_map>
#include <string>

int main()
{
  std::unordered_multimap<std::string, int> um = {
    {"Alice", 3},
    {"Bob", 1},
    {"Carol", 4},
  };

  // ハッシュ値を事前計算
  const char* key = "Alice";
  std::size_t hash = um.hash_function()(key);

  // 事前計算しておいたハッシュ値を、検索インタフェースにキーといっしょに渡すことで、
  // 内部でのハッシュ値計算を省略できる
  if (um.contains(key, hash)) {
    auto it = um.find(key, hash);
    std::cout << it->first << ':' << it->second << std::endl;
  }
}
```
* contains[color ff0000]
* um.hash_function()[link hash_function.md]
* um.find[link find.md]

#### 出力
```
Alice:3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0458R2 Checking for Existence of an Element in Associative Containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0458r2.html)
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
- [P0920R2 Precalculated hash values in lookup](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0920r2.html)
