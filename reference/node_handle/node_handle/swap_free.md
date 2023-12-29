# swap (非メンバ関数)
* cpp17[meta cpp]
* node_handle[meta category]
* function[meta id-type]
* [meta namespace]

```cpp
friend void swap(node_handle& x, node_handle& y) noexcept(noexcept(x.swap(y)));
```

## 概要
2つの値を入れ替える。


## 要件
一方のノードハンドルが空である。または、`allocator_traits<allocator_type>::propagate_on_container_swap`が`true`である。または、両方のアロケータが等値である。


## 効果
`x.`[`swap`](swap.md)`(y);`


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };

  // ノードを取得
  std::map<int, char>::node_type node1 = m.extract(10);
  std::map<int, char>::node_type node2 = m.extract(20);

  std::cout << "node1 : [" << node1.key() << ", " << node1.mapped() << "]" << std::endl;
  std::cout << "node2 : [" << node2.key() << ", " << node2.mapped() << "]\n" << std::endl;

  // ノードを入れ替える
  std::swap(node1, node2);

  std::cout << "node1 : [" << node1.key() << ", " << node1.mapped() << "]" << std::endl;
  std::cout << "node2 : [" << node2.key() << ", " << node2.mapped() << "]" << std::endl;
}
```
* std::swap[color ff0000]
* extract[link reference/map/map/extract.md.nolink]
* key[link key.md]
* mapped[link mapped.md]

### 出力
```
node1 : [10, a]
node2 : [20, b]

node1 : [20, b]
node2 : [10, a]
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
- [node_handle](/reference/node_handle/node_handle.md)

## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
