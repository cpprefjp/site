# operator==
* flat_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* flat_map[meta class]
* cpp23[meta cpp]

```cpp
friend bool operator==(const flat_map& x, const flat_map& y);
```

## 概要
`x` が `y` と等しいかどうかの判定を行う。


## 戻り値
以下と等価：

```cpp
return equal(x.begin(), x.end(), y.begin(), y.end());
```
* equal[link /reference/algorithm/equal.md]
* begin()[link begin.md]
* end()[link end.md]


## 計算量
[`size()`](size.md) に対して線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm1 = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  std::flat_map<int, char> fm2 = {
    {3, 'a'},
    {1, 'b'},
  };

  std::cout << std::boolalpha;
  std::cout << (fm1 == fm1) << std::endl;
  std::cout << (fm1 == fm2) << std::endl;
  std::cout << (fm1 != fm1) << std::endl;
  std::cout << (fm1 != fm2) << std::endl;
}
```

### 出力
```
true
false
false
true
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

