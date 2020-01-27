# node_handle
* cpp17[meta cpp]
* node_handle[meta header]
* class[meta id-type]


```cpp
template<unspecified>
class node_handle;
```

## 概要
クラス`node_handle`の名前は未規定だが、説明のために名前`node_handle`を用いる。

ノードハンドルは、連想コンテナ[`std::set`](/reference/set/set.md)、[`std::multiset`](/reference/set/multiset.md)、[`std::map`](/reference/map/map.md)、[`std::multimap`](/reference/map/multimap.md)またはunordered連想コンテナ[`std::unordered_set`](/reference/unordered_set/unordered_set.md)、[`std::unordered_multiset`](/reference/unordered_set/unordered_multiset.md)、[`std::unordered_map`](/reference/unordered_map/unordered_map.md)、[`std::unordered_multimap`](/reference/unordered_map/unordered_multimap.md)から単一要素の所有権を受け取るオブジェクトである。

互換性のあるノードを持つ別のコンテナにその所有権を移すために使用される。
互換性のあるノードを持つコンテナは、同じノードハンドル型を持つ。

要素は、次の表の同じ行にあるコンテナ型間でどちらの方向にも転送できる。

|  |  |
|-----------------|----------------|
| `map<K, T, C1, A>` | `map<K, T, C2, A>` |
| `map<K, T, C1, A>` | `multimap<K, T, C2, A>` |
| `set<K, C1, A>` | `set<K, C2, A>` |
| `set<K, C1, A>` | `multiset<K, C2, A>` |
| `unordered_map<K, T, H1, E1, A>` | `unordered_map<K, T, H2, E2, A>` |
| `unordered_map<K, T, H1, E1, A>` | `unordered_multimap<K, T, H2, E2, A>` |
| `unordered_set<K, H1, E1, A>` | `unordered_set<K, H2, E2, A>` |
| `unordered_set<K, H1, E1, A>` | `unordered_multiset<K, H2, E2, A>` |

ノードハンドルが空でない場合は、要素が抽出されたときのコンテナのア�ケータと�しいア�ケータが含まれる。ノードハンドルが空の場合、ア�ケータは含まれない。

`key_type` を `K`、 `mapped_type` を `T` としたとき、`std::pair<K, T>`または`std::pair<const K, T>`に対するユーザー定義の特殊化が�在する場合、ノードハンドルを用いる操作は未定義である。

また、`node_handle`はムーブオンリーである。


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](node_handle/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](node_handle/op_destructor.md)  | デストラクタ   | C++17 |
| [`operator=`](node_handle/op_assign.md)     | 代入演算�     | C++17 |

### オブザーバー

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------------------|-------|
| [`value`](node_handle/value.md)(set) | 要素アクセス | C++17 |
| [`key`](node_handle/key.md)(map) | Keyアクセス | C++17 |
| [`mapped`](node_handle/mapped.md)(map) | 要素アクセス | C++17 |
| [`get_allocator`](node_handle/get_allocator.md) | ア�ケータオブジェクトの取得 | C++17 |
| [`operator bool`](node_handle/op_bool.md) | ノードハンドルが空であるかどうかを調べる | C++17 |
| [`empty`](node_handle/empty.md) | ノードハンドルが空であるかどうかを調べる | C++17 |


### 変更

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------------------|-------|
| [`swap`](node_handle/swap.md) | 2つの`node_handle`オブジェクトを入れ替える | C++17 |


## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `key_type` | テンプレートパラメータ `Key`。 | C++17 |
| `value_type`(set) | テンプレートパラメータ `Key`。 | C++17 |
| `value_type`(map) | 要素の型。`std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`。 | C++17 |
| `mapped_type`(map) | 値の型。テンプレートパラメータ `T`。 | C++17 |
| `allocator_type` | ア�ケータの型。 | C++17 |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`swap`](node_handle/swap_free.md) | 2つの`node_handle`オブジェクトを入れ替える | C++17 |

## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  // char を�ー、int を値として扱う連想配列
  std::map<char, int> m1, m2;

  // m1 へ挿入
  m1.insert(std::make_pair('a', 10));
  m1.insert(std::make_pair('b', 20));
  m1.insert(std::make_pair('c', 30));

  // ノードを取得(要素は、コピーもムーブもされない)
  // なお、node_type は node_handle の特殊化である
  std::map<char, int>::node_type node = m1.extract('c');

  // m2 へ挿入(要素は、コピーもムーブもされない)
  m2.insert(std::move(node));

  std::cout << "m1 :" << std::endl;

  for (const auto& [key, value] : m1)
    std::cout << "[" << key << ", " << value << "]" << std::endl;

  std::cout << "\n" << "m2 :" << std::endl;

  for (const auto& [key, value] : m2)
    std::cout << "[" << key << ", " << value << "]" << std::endl;
}
```
* node_type[color ff0000]


### 出力
```
m1 :
[a, 10]
[b, 20]

m2 :
[c, 30]
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5


## 関連項目
- [`std::set`](/reference/set/set.md)
- [`std::multiset`](/reference/set/multiset.md)
- [`std::map`](/reference/map/map.md)
- [`std::multimap`](/reference/map/multimap.md)
- [`std::unordered_set`](/reference/unordered_set/unordered_set.md)
- [`std::unordered_multiset`](/reference/unordered_set/unordered_multiset.md)
- [`std::unordered_map`](/reference/unordered_map/unordered_map.md)
- [`std::unordered_multimap`](/reference/unordered_map/unordered_multimap.md)

## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)

