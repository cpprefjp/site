# keys
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const key_container_type& keys() const noexcept;           // (1) C++23
constexpr const key_container_type& keys() const noexcept; // (1) C++26
```

## 概要
キーのコンテナを取得する。


## 戻り値
`flat_multimap` クラス内部で保持しているキーのコンテナ。


## 計算量
定数時間


## 例
```cpp example
#include <flat_map>
#include <iostream>
#include <type_traits>
#include <vector>

int main()
{
  std::flat_multimap<int, char> fm;
  fm.insert({3, 'C'});
  fm.insert({1, 'A'});
  fm.insert({2, 'B'});
  fm.insert({1, 'a'});

  static_assert(std::is_same_v<decltype(fm.keys()), const std::vector<int>&>);
    
  for (auto i : fm.keys()) {
      std::cout << i << std::endl;
  }
}
```
* keys()[color ff0000]

### 出力
```
1
1
2
3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|----------------------------------------|-------------------------------------------|
| [`flat_multimap::values`](values.md)   | 値のコンテナを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
