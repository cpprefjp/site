#hash_function
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
hasher hash_function() const;
```

##概要
コンテナのハッシュ関数オブジェクトを返す


##戻り値
コンテナのハッシュ関数オブジェクト。

このメンバ関数で返されるハッシュ関数オブジェクトは、コンストラクタ、あるいは、直近の代入（コピー、あるいはムーブ）、交換でコンテナに保存されたオブジェクトのコピーである。


##計算量
定数


##備考
戻り値の型である、ハッシュ関数オブジェクトの型 `hasher` は、[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md) のメンバ型で、三番目のテンプレートパラメータ `Hash` を別名定義したものである。

ハッシュ関数オブジェクトは、名前の通りハッシュ値を算出するためのオブジェクトで、キー値が与えられると `std::size_t` の値を返すメンバ関数 `std::size_t operator()(key_type)` を持つ必要がある。

また、`key_equal` が `true` を返すキー値に対しては、それらのキー値それぞれに対してハッシュ関数オブジェクト `hasher` が返す値も等しくなければならない。

なお、`key_equal` が `false` を返すキー値に対しては、それらのキー値それぞれに対してハッシュ関数オブジェクト `hasher` が返す値は必ずしも異なる必要はないが、可能な限り異なる値を返すべきである。

テンプレートパラメータを省略した場合、`hasher` はデフォルト値 `std::`[`hash`](/reference/functional/hash.md)`<key_type>` となる。


##例
```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::unordered_multimap<std::string, int> um = {
    {"1st", 1},
    {"2nd", 2},
    {"3rd", 3}
  };

  decltype(um)::hasher hash{ um.hash_function() };

  std::cout << "hash(\"1st\") = " << hash("1st") << std::endl;
  std::cout << "hash(\"2nd\") = " << hash("2nd") << std::endl;
}
```
* iostream[link /reference/iostream.md]
* string[link /reference/string.md]
* unordered_map[link /reference/unordered_map.md]

###出力例
```
hash("1st") = 4827876729863105478
hash("2nd") = 12978775524054262047
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| | |
|-----------------------------------------|------------------------------------------------------|
| [`hash`](/reference/functional/hash.md) | デフォルトのハッシュ関数オブジェクト(class template) |
| [`key_eq`](key_eq.md)                 | キー比較用関数オブジェクトの取得                     |

