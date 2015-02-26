#key_eq (C++11)
* unordered_set[meta header]

```cpp
key_equal key_eq() const;
```

##概要
コンテナのキー比較用関数オブジェクトを返す


##戻り値
コンテナのキー比較用関数オブジェクト。

このメンバ関数で返されるキー比較用関数オブジェクトは、コンストラクタ、あるいは、直近の代入（コピー、あるいはムーブ）、交換でコンテナに保存されたオブジェクトのコピーである。


##計算量
定数


##備考
戻り値の型である、キー比較用関数オブジェクトの型 `key_equal` は、[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) のメンバ型で、三番目のテンプレートパラメータ `Pred` を `typedef` したものである。

キー比較用関数オブジェクトは、名前の通りキーを比較するためのオブジェクトで、与えられた二つのキーが等しいときには `true`、等しくないときには `false` を返すメンバ関数 `bool operator()(key_type, key_type)`を持つ必要がある。

テンプレートパラメータを省略した場合、`key_equal` はデフォルト値 `std::`[`equal_to`](/reference/functional/equal_to.md)`<key_type>` となる。


##例
```cpp
#include <iostream>
#include <unordered_set>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_multiset<int> um{ 1, 2, 3, 4, 5, 6, };

  decltype(um)::key_equal eq{ um.key_eq() };

  std::cout << "eq(1, 2) = " << eq(1, 2) << std::endl;
  std::cout << "eq(1, 1) = " << eq(1, 1) << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link ../unordered_multiset.md]
* boolalpha[link ../../ios/boolalpha.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* key_eq[color ff0000]

###出力
```
eq(1, 2) = false
eq(1, 1) = true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| | |
|----------------------------------------------------|----------------------------------------------|
| [`equal_to`](/reference/functional/equal_to.md)    | 等値比較演算関数オブジェクト(class template) |
| [`hash_function`](./hash_function.md)              | ハッシュ関数オブジェクトの取得 |

