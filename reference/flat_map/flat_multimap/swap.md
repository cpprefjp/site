# swap
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void swap(flat_multimap& y) noexcept; // (1) C++23
```

## 概要
コンテナ内のコンテンツを、同じ型の要素を保持する他の `flat_multimap` オブジェクトである `y` 内のコンテンツと交換する。

このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は `y` へ、`y` 内にあった要素は `*this` へ移る。


## 計算量
定数時間


## 例
```cpp example
#include <flat_map>
#include <iostream>

template <class Map>
void print(const char* name, const Map& m)
{
  std::cout << name << " : {";

  bool first = true;

  for (const auto& x : m) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ", ";
    }
    std::cout << "[" << x.first << "," << x.second << "]";
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::flat_multimap<int, char> fm1 = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };

  std::flat_multimap<int, char> fm2 = {
    {5, 'd'},
    {15, 'e'}
  };

  // fm1とfm2を入れ替える
  fm1.swap(fm2);

  print("fm1", fm1);
  print("fm2", fm2);
}
```
* swap[color ff0000]

### 出力
```
fm1 : {[5,d], [15,e]}
fm2 : {[10,a], [20,b], [30,c]}
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
