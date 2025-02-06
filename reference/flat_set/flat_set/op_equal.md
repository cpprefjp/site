# operator==
* flat_set[meta header]
* std[meta namespace]
* function template[meta id-type]
* flat_set[meta class]

```cpp
friend bool operator==(const flat_set& x, const flat_set& y);
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
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs1 = {3, 1, 4};

  std::flat_set<int> fs2 = {3, 1};

  std::cout << std::boolalpha;
  std::cout << (fs1 == fs1) << std::endl;
  std::cout << (fs1 == fs2) << std::endl;
  std::cout << (fs1 != fs1) << std::endl;
  std::cout << (fs1 != fs2) << std::endl;
}
```

### 出力
```
true
false
false
true
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
