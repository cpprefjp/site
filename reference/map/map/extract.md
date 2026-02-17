# extract
* map[meta header]
* function[meta id-type]
* std[meta namespace]
* map[meta class]
* cpp17[meta cpp]

```cpp
node_type extract(const_iterator position);           // (1) C++17
constexpr node_type extract(const_iterator position); // (1) C++26

node_type extract(const key_type& x);           // (2) C++17
constexpr node_type extract(const key_type& x); // (2) C++26

template <class K>
node_type extract(K&& x);           // (3) C++23
template <class K>
constexpr node_type extract(K&& x); // (3) C++26
```

## 概要
指定された要素を`*this`から切り離し、その要素を所有する[ノードハンドル](/reference/node_handle/node_handle.md)を取得する。

- (1) : `position`が指すノードを切り離す
- (2) : `x`と等価なキーをもつノードを切り離す
- (3) : `key_type`と比較可能な`x`と等価なキーをもつノードを切り離す


## 戻り値
要素を所有するか、空のノードハンドル


## 計算量
- (1) : 償却定数時間
- (2), (3) : 要素数を`N`として、`log(N)`


## 備考
- この関数は、要素に対するコピーもムーブも行わずに、要素の所有権を転送することができる
- この関数は、再確保なしでマップ要素のキーを変更することができる


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m1;
  std::map<int, char> m2 = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };

  // ノードを取得
  std::map<int, char>::node_type node = m2.extract(10);

  // キーを書き換え
  node.key() = 15;

  // ノードを転送
  m1.insert(std::move(node));

  std::cout << "m1 :" << std::endl;

  for (const auto& [key, value] : m1)
    std::cout << "[" << key << ", " << value << "]" << std::endl;

  std::cout << "\n" << "m2 :" << std::endl;

  for (const auto& [key, value] : m2)
    std::cout << "[" << key << ", " << value << "]" << std::endl;
}
```
* extract[color ff0000]
* node_type[link /reference/node_handle/node_handle.md]
* key[link /reference/node_handle/node_handle/key.md]


### 出力
```
m1 :
[15, a]

m2 :
[20, b]
[30, c]
```

## バージョン
### 言語
- C++17


### 処理系
- [Clang](/implementation.md#clang): 7.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 関連項目
- [node_handle](/reference/node_handle/node_handle.md)


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
- [P2077R3 Heterogeneous erasure overloads for associative containers](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2077r3.html)
    - C++23で、`template <class K> extract(K&& x)`のオーバーロードが追加された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
