# operator!=
* map[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator>
  bool operator!=(const map<Key,T,Compare,Allocator>& x, const map<Key,T,Compare,Allocator>& y);
}
```

## 概要
`x` と `y` が�しくないかどうかの判定を行う。


## パラメータ
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
二つのコンテナが�しくない場合に `true`, そうでない場合に `false`。


## 計算量
[`size()`](/reference/map/map/size.md) に対して線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int,char> m1, m2;
  m1.insert(std::make_pair(1,'a'));
  m1.insert(std::make_pair(2,'b'));
  m1.insert(std::make_pair(3,'c'));
  m2 = m1;

  std::cout << (m1 != m2) << std::endl;

  m2.insert(std::make_pair(4,'d'));

  std::cout << (m1 != m2) << std::endl;

  return 0;
}
```
* insert[link insert.md]

### 出力
```
0
1
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012

