# swap (非メンバ関数)
* flat_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Compare, class KeyContainer class MappedContainer>
  void swap(flat_map<Key, T, Compare, KeyContainer MappedContainer>& x,
            flat_map<Key, T, Compare, KeyContainer MappedContainer>& y); // (1) C++23
}
```

## 概要
2つの `flat_map` オブジェクトを入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y)`


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
  std::flat_map<int, char> fm1 = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };

  std::flat_map<int, char> fm2 = {
    {5, 'd'},
    {15, 'e'}
  };

  // fm1とfm2を入れ替える
  std::swap(fm1, fm2);

  print("fm1", fm1);
  print("fm2", fm2);
}
```
* std::swap[color ff0000]

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
