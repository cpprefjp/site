# extract
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
container_type extract() &&;  // C++23
```

## 概要
値のコンテナを戻り値として返す。


## 戻り値
クラス内部のデータ保持形式である `container_type` オブジェクト。


## 事後条件
呼び出し側の `flat_set` は空になる（たとえ例外で関数が中断されたとしても）。


## 計算量
定数時間。


## 備考
本関数は右辺値修飾されているので、右辺値からのみ読み出し可能である。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <utility>

int main()
{
  std::flat_set<int> fs = {3, 1, 4};

  std::cout << fs.size() << std::endl;

  decltype(fs)::container_type c = std::move(fs).extract();

  std::cout << fs.size() << std::endl;
  std::cout << std::endl;

  for (int i : c) {
    std::cout << i << std::endl;
  }
}
```
* extract()[color ff0000]
* fs.size()[link size.md]
* std::move[link /reference/utility/move.md]

### 出力
```
3
0

1
3
4
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
