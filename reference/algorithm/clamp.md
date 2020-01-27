# clamp
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr const T& clamp(const T& v, const T& low, const T& high);

  template <class T, class Compare>
  constexpr const T& clamp(const T& v, const T& low, const T& high, Compare comp);
}
```

## 概要
値を範囲内に収める。

この関数は、`v`の値を範囲`[low, high]`に収める。


## テンプレートパラメータ制約
- (1) : 型`T`は[LessThanComparable](/reference/concepts/LessThanComparable.md)の要件を満たしていること


## 事前条件
- `low`の値は`high`の値より大きくなってはならない


## 戻り値
- `v`の値が`low`より小さければ`low`を返す
- `v`の値が`high`より大きければ`high`を返す
- そうでなければ`v`を返す


## 備考
- `clamp(v, low, high)`は[`min`](min.md)`(`[`max`](max.md)`(v, low), high)`と�価


## 例
```cpp example
#include <iostream>
#include <algorithm>

int main()
{
  for (int i = 0; i < 10; ++i) {
    // iの値を範囲[2, 7]に収める
    int result = std::clamp(i, 2, 7);
    std::cout << i << " : " << result << std::endl;
  }
}
```
* std::clamp[color ff0000]

### 出力
```
0 : 2
1 : 2
2 : 2
3 : 3
4 : 4
5 : 5
6 : 6
7 : 7
8 : 7
9 : 7
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.9
- [GCC](/implementation.md#gcc): 7.1
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N4536 An algorithm to "clamp" a value between a pair of boundary values](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4536.html)
- [P0025R0 An algorithm to "clamp" a value between a pair of boundary values (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0025r0.html)
