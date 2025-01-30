# containers
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Key,
            class T,
            class Compare = less<Key>,
            class KeyContainer = vector<Key>,
            class MappedContainer = vector<T>>
  class flat_multimap {
  public:
    using key_container_type = KeyContainer;
    using mapped_container_type = MappedContainer;

    struct containers {
      key_container_type keys;
      mapped_container_type values;
    };
  };
}
```
* less[link /reference/functional/less.md]
* vector[link /reference/vector/vector.md]

## 概要
`flat_multimap`クラス内部のデータ保持方法として、キーのコンテナと値のコンテナをもつ。

この形式の内部表現は [`extract()`](extract.md) メンバ関数で取得でき、シリアライズなどの用途に使用できる。


## 例
### 基本的な使い方
```cpp example
#include <flat_map>
#include <iostream>
#include <string>
#include <utility>

int main()
{
  std::flat_multimap<char, std::string> fm = {
    {'s', "static"},
    {'s', "signed"},
    {'s', "struct"},
    {'c', "const"},
    {'c', "class"}
  };

  decltype(fm)::containers c = std::move(fm).extract();

  std::cout << "keys:" << std::endl;
  for (const auto& key : c.keys) {
    std::cout << "  '" << key << "'" << std::endl;
  }

  std::cout << "values:" << std::endl;
  for (const auto& value : c.values) {
    std::cout << "  \"" << value << "\"" << std::endl;
  }
}
```
* containers[color ff0000]
* extract()[link extract.md]

#### 出力
```
keys:
  'c'
  'c'
  's'
  's'
  's'
values:
  "const"
  "class"
  "static"
  "signed"
  "struct"
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`extract`](extract.md)
