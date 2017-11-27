# operator!=
* map[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator!=(const multimap<Key,T,Compare,Allocator>& x, const multimap<Key,T,Compare,Allocator>& y);
```

## 概要
`x` と `y` が等しくないかどうかの判定を行う。


## パラメータ
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
二つのコンテナが等しくない場合に `true`, そうでない場合に `false`。


## 計算量
[`size()`](/reference/map/multimap/size.md) に対して線形時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> m1, m2;
  m1.insert(std::make_pair(1, 'a'));
  m1.insert(std::make_pair(2, 'b'));
  m1.insert(std::make_pair(3, 'c'));
  m2 = m1;

  std::cout << (m1 != m2) << std::endl;

  m2.insert(std::make_pair(4, 'd'));

  std::cout << (m1 != m2) << std::endl;

  return 0;
}
```

### 出力
```
0
1
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

