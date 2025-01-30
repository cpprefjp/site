# extract
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
containers extract() &&;  // C++23
```

## 概要
キーのコンテナ、値のコンテナを戻り値として返す。


## 戻り値
クラス内部のデータ保持形式である [`containers`](containers.md) オブジェクト。


## 事後条件
呼び出し側の `flat_multimap` は空になる（たとえ例外で関数が中断されたとしても）。


## 計算量
定数時間。


## 備考
本関数は右辺値修飾されているので、右辺値からのみ読み出し可能である。


## 例
```cpp example
#include <flat_map>
#include <iostream>
#include <string>
#include <utility>

int main()
{
  std::flat_multimap<std::string, int> fm = {
    {"Alice", 3},
    {"Bob",   1},
    {"Carol", 4}
  };

  std::cout << fm.size() << std::endl;

  decltype(fm)::containers c = std::move(fm).extract();

  std::cout << fm.size() << std::endl;
  std::cout << std::endl;

  auto k = c.keys.cbegin();
  auto v = c.values.cbegin();
  std::cout << "{" << std::endl;
  for (; k != c.keys.cend() && v != c.values.cend(); ++k, ++v) {
    std::cout << "  " << *k << ": " << *v << "," << std::endl;
  }
  std::cout << "}" << std::endl;
}
```
* extract()[color ff0000]
* fm.size()[link size.md]

### 出力
```
3
0

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


## 関連項目
- [`containers`](containers.md)
