# hash_function
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
hasher hash_function() const;
```

## 概要
コンテナのハッシュ関数オブジェクトを返す


## 戻り値
コンテナのハッシュ関数オブジェクト。

このメンバ関数で返されるハッシュ関数オブジェクトは、コンストラクタ、あるいは、直近の代入（コピー、あるいはムーブ）、交換でコンテナに保�されたオブジェクトのコピーである。


## 計算量
定数


## 備考
戻り値の型である、ハッシュ関数オブジェクトの型 `hasher` は、[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) のメンバ型で、二番目のテンプレートパラメータ `Hash` を別名定義したものである。

ハッシュ関数オブジェクトは、名前の通りハッシュ値を算出するためのオブジェクトで、�ー値が与えられると `std::size_t` の値を返すメンバ関数 `std::size_t operator()(key_type)` を持つ必要がある。

また、`key_equal` が `true` を返す�ー値に対しては、それらの�ー値それぞれに対してハッシュ関数オブジェクト `hasher` が返す値も�しくなければならない。

なお、`key_equal` が `false` を返す�ー値に対しては、それらの�ー値それぞれに対してハッシュ関数オブジェクト `hasher` が返す値は必ずしも異なる必要はないが、可能な限り異なる値を返すべきである。

テンプレートパラメータを省略した場合、`hasher` はデフォルト値 `std::`[`hash`](/reference/functional/hash.md)`<key_type>` となる。


## 例
```cpp example
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> ums{ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, };

  decltype(um)::hasher hash{ ums.hash_function() };

  std::cout << "hash(1) = " << hash(1) << std::endl;
  std::cout << "hash(2) = " << hash(2) << std::endl;
}
```
* hash_function()[color ff0000]

### 出力
```
hash(1) = 1
hash(2) = 2
```

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

| 名前 | 説明 |
|-----------------------------------------|------------------------------------------------------|
| [`hash`](/reference/functional/hash.md) | デフォルトのハッシュ関数オブジェクト(class template) |
| [`key_eq`](key_eq.md)                 | �ー比較用関数オブジェクトの取得                     |

