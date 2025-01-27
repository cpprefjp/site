# values
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const mapped_container_type& values() const noexcept; // C++23
```

## 概要
値のコンテナを取得する。


## 戻り値
`flat_map` クラス内部で保持している値のコンテナ。


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
  std::flat_map<int, char> fm;
  fm[3] = 'C';
  fm[1] = 'A';
  fm[2] = 'B';

  static_assert(std::is_same_v<decltype(fm.values()), const std::vector<char>&>);
    
  for (auto i : fm.values()) {
      std::cout << i << std::endl;
  }
}
```
* values()[color ff0000]

### 出力
```
A
B
C
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
|-------------------------------|-------------------------------------------|
| [`flat_map::keys`](keys.md)   | キーのコンテナを取得する |
