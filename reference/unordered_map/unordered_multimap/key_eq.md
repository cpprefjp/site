# key_eq
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
key_equal key_eq() const;
```

## 概要
コンテナの�ー比較用関数オブジェクトを返す


## 戻り値
コンテナの�ー比較用関数オブジェクト。

このメンバ関数で返される�ー比較用関数オブジェクトは、コンストラクタ、あるいは、直近の代入（コピー、あるいはムーブ）、交換でコンテナに保�されたオブジェクトのコピーである。


## 計算量
定数


## 備考
戻り値の型である、�ー比較用関数オブジェクトの型 `key_equal` は、[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md) のメンバ型で、四番目のテンプレートパラメータ `Pred` を別名定義したものである。

�ー比較用関数オブジェクトは、名前の通り�ーを比較するためのオブジェクトで、与えられた二つの�ーが�しいときには `true`、�しくないときには `false` を返すメンバ関数 `bool operator()(key_type, key_type)`を持つ必要がある。

テンプレートパラメータを省略した場合、`key_equal` はデフォルト値 `std::`[`equal_to`](/reference/functional/equal_to.md)`<key_type>` となる。


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_multimap<std::string, int> um = {
    {"1st", 1},
    {"2nd", 2},
    {"3rd", 3}
  };

  decltype(um)::key_equal eq{ um.key_eq() };

  std::cout << "eq(\"1st\", \"2nd\") = " << eq("1st", "2nd") << std::endl;
  std::cout << "eq(\"1st\", \"2nd\") = " << eq("1st", "1st") << std::endl;
}
```
* key_eq()[color ff0000]

### 出力
```
eq("1st", "2nd") = false
eq("1st", "2nd") = true
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
|----------------------------------------------------|----------------------------------------------|
| [`equal_to`](/reference/functional/equal_to.md)    | �値比較演算関数オブジェクト(class template) |
| [`hash_function`](hash_function.md)              | ハッシュ関数オブジェクトの取得 |

