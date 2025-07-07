# replace
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void replace(container_type&& cont);  // C++23
```

## 概要
値のコンテナを置き換える。


## 効果
`flat_set` クラスが内部で保持している `container_type` を `c` とすると、以下と等価。
    ```cpp
    c = std::move(cont);
    ```
    * std::move[link /reference/utility/move.md]


## 事前条件
- `cont` が `key_compare` に基づいてソートされていること。
- `cont` に重複する要素がないこと。


## 計算量
`cont` をムーブした計算量と同じ。


## 例
```cpp example
#include <algorithm>
#include <cassert>
#include <flat_set>
#include <iostream>
#include <string>
#include <utility>

int main()
{
  std::vector<std::string> keys = {"Alice", "Bob", "Carol"};

  // 事前条件の確認
  assert(std::is_sorted(keys.begin(), keys.end()));
  assert(std::adjacent_find(keys.begin(), keys.end()) == keys.end());

  std::flat_set<std::string> fs;

  std::cout << fs.size() << std::endl;

  fs.replace(std::move(keys));

  std::cout << fs.size() << std::endl;
  std::cout << std::endl;

  std::cout << "{" << std::endl;
  for (const std::string& i: fs) {
    std::cout << "  " << i << "," << std::endl;
  }
  std::cout << "}" << std::endl;
}
```
* replace[color ff0000]
* fs.size()[link size.md]
* std::move[link /reference/utility/move.md]

### 出力
```
0
3

{
  Alice,
  Bob,
  Carol,
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
