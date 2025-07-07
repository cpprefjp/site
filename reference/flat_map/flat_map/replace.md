# replace
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void replace(key_container_type&& key_cont, mapped_container_type&& mapped_cont);  // C++23
```

## 概要
キーのコンテナ、値のコンテナをそれぞれ置き換える。


## 効果
`flat_map` クラスが内部で保持している [`containers`](containers.md) を `c` とすると、以下と等価。
    ```cpp
    c.keys = std::move(key_cont);
    c.values = std::move(mapped_cont)
    ```


## 事前条件
- `key_cont.size() == mapped_cont.size()` が真であること。
- `key_cont` が `key_compare` に基づいてソートされていること。
- `key_cont` に重複する要素がないこと。


## 計算量
`key_cont` および `mapped_cont` をムーブした計算量と同じ。


## 例
```cpp example
#include <algorithm>
#include <cassert>
#include <flat_map>
#include <iostream>
#include <string>
#include <utility>

int main()
{
  std::vector<std::string> keys = {"Alice", "Bob", "Carol"};
  std::vector<int> values = {3, 1, 4};

  // 事前条件の確認
  assert(keys.size() == values.size());
  assert(std::is_sorted(keys.begin(), keys.end()));
  assert(std::adjacent_find(keys.begin(), keys.end()) == keys.end());

  std::flat_map<std::string, int> fm;

  std::cout << fm.size() << std::endl;

  fm.replace(std::move(keys), std::move(values));

  std::cout << fm.size() << std::endl;
  std::cout << std::endl;

  std::cout << "{" << std::endl;
  for (const auto& kv: fm) {
    std::cout << "  " << kv.first << ": " << kv.second << "," << std::endl;
  }
  std::cout << "}" << std::endl;
}
```
* replace[color ff0000]
* fm.size()[link size.md]

### 出力
```
0
3

{
  Alice: 3,
  Bob: 1,
  Carol: 4,
}
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
