# operator<=>
* flat_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* flat_map[meta class]
* cpp23[meta cpp]

```cpp
synth-three-way-result<value_type>
  operator<=>(const flat_map& x,
              const flat_map& y); // (1) C++23
```

## 概要
`flat_map`オブジェクトの三方比較を行う。


## テンプレートパラメータ制約
- 型 (`const`) `value_type` の値に対して`operator<=>`が定義されるか、型 (`const`) `value_type` の値に対して`operator<`が定義され全順序をもつこと


## 効果
```cpp
return lexicographical_compare_three_way(
    x.begin(), x.end(),
    y.begin(), y.end(),
    synth-three-way);
```
* lexicographical_compare_three_way[link /reference/algorithm/lexicographical_compare_three_way.md]
* begin()[link begin.md]
* end()[link end.md]


## 計算量
線形時間


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  stdx::flat_map<int, char> fm1 = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  stdx::flat_map<int, char> fm2 = {
    {3, 'a'},
    {1, 'b'},
  };

  std::cout << std::boolalpha;
  std::cout << ((fm1 <=> fm1) == 0) << std::endl;
  std::cout << (fm1 < fm2) << std::endl;
  std::cout << (fm1 <= fm1) << std::endl;
  std::cout << (fm1 > fm2) << std::endl;
  std::cout << (fm2 >= fm1) << std::endl;
}
```

### 出力
```
true
false
true
true
false
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

